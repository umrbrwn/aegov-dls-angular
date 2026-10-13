---
name: custom-theming
description: Use when configuring entity brand palettes and custom CSS design tokens for an authority or ministry in aegov-dls-angular.
---

# custom-theming

AEGov DLS Angular components use CSS custom property design tokens for colors, typography, and spacing.

Federal entities (Ministries vs Authorities) have distinct, dedicated visual identities. An application is built for a single entity and adheres to its specific brand color scheme globally.

### 1. Global Stylesheet Setup

Import the base library stylesheet in `styles.css` or `angular.json`:

```css
/* In global styles.css */
@import "aegov-dls-angular/styles.css";
```

### 2. Ministry Applications (Default Theme)

Ministry portals use the standard UAE Federal Government Design Language System primary palette (UAE Gold / Government Green) out of the box without requiring custom CSS overrides.

### 3. Authority Applications (Custom Entity Palette)

Government Authorities (such as TDRA, etc.) define their own official brand color scale. You can either map the primary palette to one of the built-in design system palettes or provide custom OKLCH / HEX values on `:root`:

```css
/* In global styles.css */
@import "aegov-dls-angular/styles.css";

/* Option A: Map to Built-in Entity Palettes (e.g. Tech Blue, Desert, Sea Blue, Fuchsia) */
:root {
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

/* Option B: Custom Brand Palette using OKLCH or HEX */
:root {
  --color-primary-500: oklch(0.65 0.17 245.2);
  --color-primary-600: oklch(0.57 0.18 245.2);
}
```

Pre-bundled brand palettes available out-of-the-box:
`--color-techblue-*`, `--color-seablue-*`, `--color-desert-*`, `--color-fuchsia-*`, `--color-camel-*`, `--color-aegold-*`, `--color-slate-*`, `--color-aered-*`, `--color-aegreen-*`, `--color-aeblack-*`.

Once defined on `:root`, all primary-colored components throughout the entire application (navigation bar active indicators, buttons, badges, form control focus rings, pagination) automatically adopt the entity's brand palette.

### 4. Component Color Props

Components support `color="primary"` and `color="secondary"`:
- `primary`: Uses the globally configured `--color-primary-*` scale (default Ministry or configured Authority palette).
- `secondary`: Uses the secondary accent palette.

