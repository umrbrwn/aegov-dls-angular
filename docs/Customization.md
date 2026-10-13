# Customization & Theming Guide

`aegov-dls-angular` is an independent Angular port of the UAE Government Design System. It does not depend on `@aegov/design-system` at runtime. Instead, it ports all original styles directly into a modern **Tailwind CSS v4 token-driven architecture** (`@theme` tokens, `@layer base`, `@layer components`, `@layer utilities`), keeping all original visual styles, color scales, and spacing completely intact.

Because this styling architecture is built entirely on **CSS Custom Properties (design tokens)**, consumer Angular applications can seamlessly customize theme palettes, entity branding, and typography with zero friction.

The UAE Design System distinguishes between **Federal Ministries** (which default to Gold / Camel palettes) and **Authorities / Government Entities** (which often use specific entity palettes like `techblue`, `seablue`, `desert`, `fuchsia`, or custom brand colors).

---

### 1. How the Styling Architecture Works

All semantic component classes (`btn-primary`, `bg-primary-600`, `text-primary-800`, `border-primary-500`, `.aegov-form-control`, etc.) point directly to CSS custom properties:
- **Primary Palette**: `--color-primary-50` through `--color-primary-950`
- **Secondary Palette**: `--color-secondary-50` through `--color-secondary-950`
- **Typography**: `--font-heading`, `--font-body`, `--font-inter`, `--font-roboto`, `--font-notokufi`, `--font-alexandria`
- **Predefined Brand Palettes**: `--color-aegold-*`, `--color-camel-*`, `--color-techblue-*`, `--color-seablue-*`, `--color-desert-*`, `--color-fuchsia-*`, `--color-slate-*`, `--color-aered-*`, `--color-aegreen-*`, `--color-aeblack-*`.

---

### 2. Customizing Theme Colors in Consumer Apps

#### A. Global Palette Override (e.g., Switching an Entity to Authority Blue / Desert)
If an authority wants to re-brand the primary palette, they can simply map the `--color-primary-*` variables to one of the built-in palettes or their entity's brand OKLCH/HEX colors in their global `styles.css` / `styles.scss`:

```css
/* src/styles.css in the Consumer Angular App */
@import 'aegov-dls-angular/styles.css';

:root {
  /* Switch Primary Palette from Default Gold to Tech Blue (for Authorities) */
  --color-primary-50: var(--color-techblue-50);
  --color-primary-100: var(--color-techblue-100);
  --color-primary-200: var(--color-techblue-200);
  --color-primary-300: var(--color-techblue-300);
  --color-primary-400: var(--color-techblue-400);
  --color-primary-500: var(--color-techblue-500);
  --color-primary-600: var(--color-techblue-600);
  --color-primary-700: var(--color-techblue-700);
  --color-primary-800: var(--color-techblue-800);
  --color-primary-900: var(--color-techblue-900);
  --color-primary-950: var(--color-techblue-950);
}
```

#### B. Multi-Entity / Ministry Theme Switching via Attributes
If a portal hosts multiple ministries or authorities, themes can be dynamically switched using `data-theme` or `data-entity` attributes on `<html>`, `<body>`, or a container:

```css
/* Ministry Theme (UAE Gold / Camel) */
[data-entity="ministry"] {
  --color-primary-500: var(--color-aegold-500);
  --color-primary-600: var(--color-aegold-600);
  --color-primary-700: var(--color-aegold-700);
  --color-primary-800: var(--color-aegold-800);
}

/* Authority Theme (Tech Blue / Modern Slate) */
[data-entity="authority"] {
  --color-primary-500: var(--color-techblue-500);
  --color-primary-600: var(--color-techblue-600);
  --color-primary-700: var(--color-techblue-700);
  --color-primary-800: var(--color-techblue-800);
}

/* Desert / Heritage Entity Theme */
[data-entity="heritage"] {
  --color-primary-500: var(--color-desert-500);
  --color-primary-600: var(--color-desert-600);
  --color-primary-700: var(--color-desert-700);
  --color-primary-800: var(--color-desert-800);
}
```

In Angular, the consumer app can dynamically toggle this:
```typescript
@Component({...})
export class AppComponent {
  setEntityTheme(entity: 'ministry' | 'authority' | 'heritage') {
    document.documentElement.setAttribute('data-entity', entity);
  }
}
```

---

### 3. Customizing Fonts (LTR & RTL Arabic/English)

By default, `@aegov/design-system` sets:
- **Heading**: `Inter` (English LTR) / `Alexandria` (Arabic RTL)
- **Body**: `Roboto` (English LTR) / `Noto Kufi Arabic` (Arabic RTL)

To change the fonts (e.g. to `Outfit`, `Tajawal`, `Cairo`, or a custom institutional font):

```css
/* 1. Import or load the desired Google/custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@400;600;700&display=swap');

/* 2. Override the CSS variables */
:root {
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Outfit', sans-serif;
}

/* 3. Override Arabic RTL fonts */
[dir="rtl"],
:root:lang(ar) {
  --font-heading: 'Cairo', sans-serif;
  --font-body: 'Cairo', sans-serif;
}
```

---

### 4. For Consumer Apps Using Tailwind CSS

If your consumer application uses Tailwind CSS, you can customize or extend tokens in your own configuration without installing any extra plugins:

#### Tailwind CSS v4 (Recommended)

In your global stylesheet, use the `@theme` block:

```css
/* src/styles.css */
@import 'tailwindcss';
@import 'aegov-dls-angular/styles.css';

@theme {
  /* Remap primary tokens to an entity palette */
  --color-primary-50: var(--color-techblue-50);
  --color-primary-500: var(--color-techblue-500);
  --color-primary-600: var(--color-techblue-600);
  --color-primary-700: var(--color-techblue-700);
}
```

#### Tailwind CSS v3 (Legacy)

If your app uses Tailwind v3, map tokens in your `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-techblue-50)',
          600: 'var(--color-techblue-600)',
        },
      },
    },
  },
};
```

---

### Summary of Benefits
1. **Zero Library Changes Needed**: The Angular components use the semantic CSS classes (`btn-primary`, `text-primary-800`, etc.), which automatically consume the active tokens.
2. **Instant Hot-Swapping**: Changing a CSS variable immediately updates all components (Buttons, Tabs, Acccordions, Navigation, Alerts, etc.) without re-rendering or rebuilding component templates.
3. **Full Compliance with UAE Guidelines**: Allows any Ministry, Authority, or Federal Entity to plug in their assigned color token set seamlessly.
