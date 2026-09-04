const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const lightningcss = require('lightningcss');

async function buildStyles() {
  const rootDir = path.resolve(__dirname, '..');
  const srcCssPath = path.resolve(rootDir, 'src/styles/tailwind.css');
  const distDir = path.resolve(rootDir, 'dist');

  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory not found. Please run ng-packagr build first.');
    process.exit(1);
  }

  const rawCss = fs.readFileSync(srcCssPath, 'utf-8');
  console.log('Compiling Tailwind CSS with @tailwindcss/postcss...');

  const result = await postcss([tailwind()]).process(rawCss, {
    from: srcCssPath,
    to: path.resolve(distDir, 'styles/tailwind.css'),
  });

  console.log('Minifying CSS with lightningcss...');
  let finalCss = result.css;
  try {
    const minified = lightningcss.transform({
      filename: 'tailwind.css',
      code: Buffer.from(result.css),
      minify: true,
    });
    finalCss = minified.code.toString();
  } catch (err) {
    console.warn('Warning: lightningcss minification encountered an issue, keeping unminified:', err.message);
  }

  const distStylesDir = path.resolve(distDir, 'styles');
  fs.mkdirSync(distStylesDir, { recursive: true });

  // Write minified CSS to dist/styles/tailwind.css
  fs.writeFileSync(path.resolve(distStylesDir, 'tailwind.css'), finalCss, 'utf-8');

  // Update dist/package.json exports to expose compiled styles and ./icons cleanly
  const distPackageJsonPath = path.resolve(distDir, 'package.json');
  if (fs.existsSync(distPackageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(distPackageJsonPath, 'utf-8'));
    pkg.exports = {
      ...pkg.exports,
      './styles/*': {
        default: './styles/*',
      },
      './styles/tailwind.css': {
        default: './styles/tailwind.css',
      },
    };
    fs.writeFileSync(distPackageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
  }

  console.log(`Successfully compiled & minified Tailwind CSS to dist/styles/tailwind.css (${(finalCss.length / 1024).toFixed(2)} KB, was ${(result.css.length / 1024).toFixed(2)} KB)`);
}

buildStyles().catch((err) => {
  console.error('Failed to compile styles:', err);
  process.exit(1);
});
