const fs = require('fs');
const path = require('path');

const coreAssetsDir = path.resolve(__dirname, '../node_modules/@phosphor-icons/core/assets');
const defaultIconsOutputPath = path.resolve(__dirname, '../src/components/Icon/default-icons.ts');

// Built-in default icons required across aegov-dls-angular components
const defaultIconUsage = {
  regular: [
    'caret-double-left',
    'caret-double-right',
    'caret-down',
    'caret-left',
    'caret-right',
    'caret-up',
    'check-circle',
    'check',
    'eye-slash',
    'eye',
    'house',
    'image',
    'info',
    'list',
    'magnifying-glass',
    'moon',
    'sun',
    'upload-simple',
    'user',
    'warning',
    'x-circle',
    'x',
  ],
  bold: [
    'caret-down',
  ],
  fill: [
    'check-circle',
    'info',
    'warning',
    'x-circle',
  ],
};

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

function syncIcons() {
  console.log('Syncing default icons from @phosphor-icons/core...');

  if (!fs.existsSync(coreAssetsDir)) {
    console.warn(`Warning: @phosphor-icons/core assets not found at ${coreAssetsDir}. Skipping sync.`);
    return;
  }

  const lines = [
    '/* Auto-generated default icons bundled for internal aegov components */',
  ];

  const mapEntries = {};

  for (const [weight, iconNames] of Object.entries(defaultIconUsage)) {
    mapEntries[weight] = {};
    const suffix = weight === 'regular' ? '' : `-${weight}`;
    const weightSuffix = weight === 'regular' ? '' : kebabToPascal(weight);

    for (const name of iconNames) {
      const fileName = `${name}${suffix}.svg`;
      const filePath = path.join(coreAssetsDir, weight, fileName);

      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: SVG file not found: ${filePath}`);
        continue;
      }

      const svgContent = fs.readFileSync(filePath, 'utf8');
      const innerSvg = extractSvgInner(svgContent);
      const varName = `ph${kebabToPascal(name)}${weightSuffix}`;
      const safeSvg = innerSvg.replace(/'/g, "\\'");

      lines.push(`export const ${varName}: string = '${safeSvg}';`);
      mapEntries[weight][name] = varName;
    }
  }

  lines.push('\nexport const defaultIcons: Record<string, Record<string, string>> = {');
  for (const [weight, icons] of Object.entries(mapEntries)) {
    lines.push(`  '${weight}': {`);
    for (const [name, varName] of Object.entries(icons)) {
      lines.push(`    '${name}': ${varName},`);
    }
    lines.push('  },');
  }
  lines.push('};\n');

  fs.mkdirSync(path.dirname(defaultIconsOutputPath), { recursive: true });
  fs.writeFileSync(defaultIconsOutputPath, lines.join('\n'), 'utf8');
  console.log(`Successfully synced default icons to ${defaultIconsOutputPath}`);
}

syncIcons();
