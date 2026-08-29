const fsPromises = require('fs').promises;
const path = require('path');

const coreAssetsDir = path.resolve(__dirname, '../node_modules/@phosphor-icons/core/assets');
const outputDir = path.resolve(__dirname, '../src/icons/generated');

const weights = [
  { id: 'regular', suffix: '', fileSuffix: '' },
  { id: 'bold', suffix: 'Bold', fileSuffix: '-bold' },
  { id: 'fill', suffix: 'Fill', fileSuffix: '-fill' },
  { id: 'light', suffix: 'Light', fileSuffix: '-light' },
  { id: 'thin', suffix: 'Thin', fileSuffix: '-thin' },
  { id: 'duotone', suffix: 'Duotone', fileSuffix: '-duotone' },
];

function kebabToPascal(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function extractSvgInner(svgContent) {
  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!match) return '';
  return match[1].trim().replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ');
}

// Built-in icons used across aegov components
const defaultIconNames = new Set([
  'check',
  'x',
  'caret-down',
  'caret-up',
  'caret-right',
  'caret-left',
  'caret-double-left',
  'caret-double-right',
  'info',
  'warning',
  'check-circle',
  'x-circle',
  'house',
  'bookmark',
  'upload-simple',
  'image',
  'quotes',
  'sun',
  'moon',
  'eye',
  'eye-slash',
  'magnifying-glass',
  'list',
  'user',
  'gear',
  'bell',
  'question',
  'newspaper',
  'table',
  'plus',
  'minus',
  'envelope-simple',
  'phone',
  'note',
  'heart',
  'star',
  'trash',
  'share-network',
  'pencil-simple',
  'lock',
  'lock-open',
  'shield',
  'camera',
  'video-camera',
  'folder',
  'file-text',
  'dots-three-vertical',
  'dots-three',
  'copy',
  'arrow-square-out',
  'arrow-left',
  'arrow-right',
  'arrows-down-up',
  'funnel',
  'circle',
  'circle-notch',
]);

// Concurrency limiter to prevent EMFILE (too many open files)
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      results[idx] = await fn(items[idx], idx);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

async function generate() {
  console.log('Generating Phosphor icons for aegov-dls-angular in parallel...');
  const startTime = Date.now();

  await fsPromises.mkdir(outputDir, { recursive: true });

  const defaultIconsByWeight = {
    regular: {},
    bold: {},
    fill: {},
    light: {},
    thin: {},
    duotone: {},
  };

  await Promise.all(
    weights.map(async (weight) => {
      const weightDir = path.join(coreAssetsDir, weight.id);
      try {
        await fsPromises.access(weightDir);
      } catch {
        console.warn(`Weight directory not found: ${weightDir}`);
        return;
      }

      const dirEntries = await fsPromises.readdir(weightDir);
      const files = dirEntries.filter((f) => f.endsWith('.svg'));
      const suffixRegex = weight.fileSuffix ? new RegExp(`${weight.fileSuffix}$`) : null;

      // Limit concurrent open file descriptors to 64
      const processedIcons = await mapLimit(files, 64, async (file) => {
        const rawName = file.replace('.svg', '');
        const iconName = suffixRegex ? rawName.replace(suffixRegex, '') : rawName;
        const filePath = path.join(weightDir, file);
        const svgContent = await fsPromises.readFile(filePath, 'utf8');
        const innerSvg = extractSvgInner(svgContent);
        const varName = `ph${kebabToPascal(iconName)}${weight.suffix}`;
        const safeSvg = innerSvg.replace(/'/g, "\\'");

        return {
          iconName,
          varName,
          safeSvg,
          isDefault: defaultIconNames.has(iconName),
        };
      });

      const lines = [];
      const dictEntries = [];

      for (const icon of processedIcons) {
        lines.push(`export const ${icon.varName} = '${icon.safeSvg}';`);
        dictEntries.push(`  '${icon.iconName}': ${icon.varName},`);

        if (icon.isDefault) {
          defaultIconsByWeight[weight.id][icon.iconName] = icon.safeSvg;
        }
      }

      const fileContent = `/* Auto-generated Phosphor Icons - ${weight.id} */\n${lines.join('\n')}\n\nexport const ${weight.id}Icons: Record<string, string> = {\n${dictEntries.join('\n')}\n};\n`;
      await fsPromises.writeFile(path.join(outputDir, `${weight.id}.ts`), fileContent, 'utf8');
      console.log(`Generated ${files.length} ${weight.id} icons in src/icons/generated/${weight.id}.ts`);
    })
  );

  // Generate default-icons.ts for zero-config internal library usage
  const defaultLines = [
    '/* Auto-generated default icons bundled for internal components */',
    'export const defaultIcons: Record<string, Record<string, string>> = {',
  ];

  for (const weight of weights) {
    defaultLines.push(`  '${weight.id}': {`);
    for (const [name, svg] of Object.entries(defaultIconsByWeight[weight.id])) {
      defaultLines.push(`    '${name}': '${svg}',`);
    }
    defaultLines.push('  },');
  }
  defaultLines.push('};\n');

  await fsPromises.writeFile(path.join(outputDir, 'default-icons.ts'), defaultLines.join('\n'), 'utf8');
  console.log('Generated src/icons/generated/default-icons.ts');

  // Generate index barrel
  const indexContent = `export * from './default-icons';
export * from './regular';
export * from './bold';
export * from './fill';
export * from './light';
export * from './thin';
export * from './duotone';
`;
  await fsPromises.writeFile(path.join(outputDir, 'index.ts'), indexContent, 'utf8');
  console.log('Generated src/icons/generated/index.ts');

  console.log(`Icon generation complete in ${((Date.now() - startTime) / 1000).toFixed(2)}s!`);
}

generate().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
