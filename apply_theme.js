const fs = require('fs');
const cssPath = './app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const themeStr = "@theme {
  --color-inverse-on-surface: #eff0ff;
  --color-inverse-primary: #b4c5ff;
  --color-surface-variant: #dce1ff;
  --color-secondary: #006c49;
  --color-on-secondary: #ffffff;
  --color-tertiary-fixed: #d9e2ff;
  --color-on-secondary-container: #00714d;
  --color-on-primary-fixed-variant: #003ea8;
  --color-on-secondary-fixed: #002113;
  --color-on-tertiary-fixed-variant: #2d4677;
  --color-surface-container-highest: #dce1ff;
  --color-secondary-fixed: #6ffbbe;
  --color-surface-container-low: #f3f2ff;
  --color-surface-container: #ebedff;
  --color-on-secondary-fixed-variant: #005236;
  --color-outline-variant: #c3c6d7;
  --color-surface-container-lowest: #ffffff;
  --color-inverse-surface: #262f4f;
  --color-error: #ba1a1a;
  --color-surface-dim: #d0d8ff;
  --color-error-container: #ffdad6;
  --color-on-tertiary-container: #edf0ff;
  --color-tertiary-fixed-dim: #afc6ff;
  --color-outline: #737686;
  --color-primary-fixed-dim: #b4c5ff;
  --color-primary-fixed: #dbe1ff;
  --color-on-surface: #101a39;
  --color-on-error: #ffffff;
  --color-tertiary-container: #556da1;
  --color-on-background: #101a39;
  --color-tertiary: #3d5486;
  --color-on-tertiary: #ffffff;
  --color-surface-bright: #faf8ff;
  --color-surface-container-high: #e3e7ff;
  --color-on-primary-fixed: #00174b;
  --color-on-primary-container: #eeefff;
  --color-background: #faf8ff;
  --color-surface-tint: #0053db;
  --color-on-tertiary-fixed: #001a43;
  --color-primary: #004ac6;
  --color-on-error-container: #93000a;
  --color-primary-container: #2563eb;
  --color-on-primary: #ffffff;
  --color-surface-light: #faf8ff;
  --color-secondary-fixed-dim: #4edea3;
  --color-secondary-container: #6cf8bb;
  --color-on-surface-variant: #434655;

  --font-headline: 'Manrope', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-label: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500&display=swap');
";

css = css.replace('@import "tailwindcss";', '@import "tailwindcss";\n\n' + themeStr);

fs.writeFileSync(cssPath, css);
console.log('Appended theme to globals.css');
