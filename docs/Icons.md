# Icon System & Customization Guide

The UAE Government Design System (`@aegov/design-system`) uses [Phosphor Icons](https://phosphoricons.com/) as its primary icon set. `aegov-dls-angular` sources its built-in icon definitions directly from [`@phosphor-icons/core`](https://www.npmjs.com/package/@phosphor-icons/core) (MIT License).

`aegov-dls-angular` features a lightweight, inline SVG-based icon architecture designed for optimal performance, zero external font dependencies, and seamless RTL/LTR support.

---

## 1. Overview & Architecture

- **Zero Font Overhead**: No heavy webfont files or external network requests.
- **Color & Size Inheritance**: Icons automatically scale using `[size]` and inherit CSS colors through `currentColor` (fully compatible with Tailwind CSS color utilities).
- **RTL-Ready**: Mirror directional icons in Arabic / RTL layouts directly with the standard Tailwind class `rtl:-scale-x-100`.
- **Tree-Shakable & Extensible**: Ships with pre-bundled default icons used by internal components and provides an extensible registry for custom consumer icons.

---

## 2. Using Built-in Icons

Import `IconDirective` into your standalone component and use `<svg aeIcon>`:

```typescript
import { Component } from '@angular/core';
import { IconDirective } from 'aegov-dls-angular';

@Component({
  selector: 'app-icon-example',
  standalone: true,
  imports: [IconDirective],
  template: `
    <!-- Regular Icon with Custom Size and Tailwind Color -->
    <svg aeIcon name="check" [size]="20" class="text-aegreen-600"></svg>

    <!-- Fill Weight Icon -->
    <svg aeIcon name="check-circle" weight="fill" [size]="24" class="text-emerald-500"></svg>

    <!-- RTL Auto-Flipping Icon (mirrors in Arabic RTL layouts) -->
    <svg aeIcon name="arrow-right" [size]="20" class="text-primary-700 rtl:-scale-x-100"></svg>
  `
})
export class IconExampleComponent {}
```

### Directive Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `undefined` | Registered icon name (e.g. `'house'`, `'check'`). |
| `weight` | `'regular' \| 'bold' \| 'fill' \| 'light' \| 'thin' \| 'duotone'` | `'regular'` | Stroke/fill weight variant. |
| `size` | `number \| string \| undefined` | `undefined` | Width and height dimension (pixels or CSS unit). |
| `className` | `string` | `''` | Extra CSS classes (e.g., text color, spacing, `rtl:-scale-x-100`). |
| `svg` | `string` | `undefined` | Direct raw SVG inner path markup (bypasses registry). |

---

## 3. Bundled Default Icons

The following icons are available out-of-the-box without any registration:

| Weight | Available Icons |
|---|---|
| **Regular** | `archive`, `arrow-counter-clockwise`, `arrow-left`, `arrow-right`, `bell-simple`, `caret-double-left`, `caret-double-right`, `caret-down`, `caret-left`, `caret-right`, `caret-up`, `check`, `check-circle`, `credit-card`, `download-simple`, `eye`, `eye-slash`, `facebook-logo`, `file-text`, `gear`, `globe`, `house`, `image`, `info`, `instagram-logo`, `linkedin-logo`, `list`, `magnifying-glass`, `moon`, `paperclip`, `person-arms-spread`, `phone`, `phone-call`, `phone-outgoing`, `plus`, `quotes`, `shield-check`, `sign-out`, `star`, `sun`, `trash`, `twitter-logo`, `upload-simple`, `user`, `warning`, `warning-circle`, `wheelchair`, `x`, `x-circle`, `x-logo`, `youtube-logo` |
| **Bold** | `caret-down` |
| **Fill** | `check-circle`, `info`, `user`, `warning`, `x-circle` |

---

## 4. Providing Custom / Consumer Icons

Applications often require custom icons, entity logos, or additional Phosphor icons. You can provide them in three ways:

### Method A: Application-Wide Registration via `provideAeIcons` (Recommended)

Register icons in your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAeIcons } from 'aegov-dls-angular';

// Define your SVG path contents (inner markup without the outer <svg> tag)
const customIcons = {
  heart: '<path d="M223,57a58.07,58.07,0,0,0-81.92,0l-13.1,13.1-13.1-13.1A58,58,0,0,0,33,139l13.1,13.1L128,234l81.9-81.9L223,139A58.07,58.07,0,0,0,223,57Z"/>',
  sparkle: '<path d="M208,128a80,80,0,0,1-80,80,80,80,0,0,1-80-80,80,80,0,0,1,80-80A80,80,0,0,1,208,128Z"/>',
};

export const appConfig: ApplicationConfig = {
  providers: [
    // Register for 'regular' weight (default)
    provideAeIcons(customIcons),
    
    // Or register for specific weights
    provideAeIcons({
      user: '<path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"/>',
    }, 'bold'),
  ],
};
```

Then use them seamlessly anywhere in templates:

```html
<svg aeIcon name="heart" [size]="24" class="text-aered-600"></svg>
<svg aeIcon name="user" weight="bold" [size]="24"></svg>
```

---

### Method B: Dynamic Registration via `AeIconRegistry`

Inject `AeIconRegistry` to register icons at runtime or inside feature modules:

```typescript
import { Component, inject } from '@angular/core';
import { AeIconRegistry, IconDirective } from 'aegov-dls-angular';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [IconDirective],
  template: `<svg aeIcon name="custom-badge" [size]="24"></svg>`,
})
export class FeatureComponent {
  private readonly iconRegistry = inject(AeIconRegistry);

  constructor() {
    this.iconRegistry.registerIcon(
      'custom-badge',
      '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Z"/>'
    );
  }
}
```

---

### Method C: Direct SVG Input via `[svg]`

Pass raw SVG `<path>` markup directly into `<svg aeIcon>` without registering in the registry. Ideal for one-off icons:

```typescript
import { Component } from '@angular/core';
import { IconDirective } from 'aegov-dls-angular';

@Component({
  selector: 'app-custom-icon',
  standalone: true,
  imports: [IconDirective],
  template: `
    <svg aeIcon [svg]="clockSvg" [size]="24" class="text-primary-600"></svg>
  `,
})
export class CustomIconComponent {
  readonly clockSvg =
    '<circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><polyline points="128 72 128 128 168 152" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>';
}
```

---

## 5. Contributor Guide: Maintaining & Syncing Default Icons

### How Default Icons Are Maintained & Synced

To keep bundle sizes minimal, `aegov-dls-angular` does not ship the entire 1,000+ Phosphor icon catalog. Instead, it maintains a curated set of icons needed across internal components (`Alert`, `Select`, `Toast`, `Pagination`, `FileUpload`, `Accordion`, `Input`, `Navigation`, `Footer`, etc.).

- **Sync Script (`scripts/generate-icons.cjs`)**: Reads SVG source files from `@phosphor-icons/core/assets`, extracts the inner `<path>` definitions, and formats them into strongly-typed TypeScript constants.
- **Generated Bundle (`src/components/Icon/default-icons.ts`)**: Auto-generated by the sync script. Contains the raw SVG path strings and exports the `defaultIcons` map keyed by weight (`regular`, `bold`, `fill`, etc.).
- **Automatic Sync on Install**: Configured in `package.json` under the `postinstall` hook (`node scripts/generate-icons.cjs`).

### Adding New Default Icons

If an internal component requires an additional Phosphor icon:

1. Open `scripts/generate-icons.cjs`.
2. Add the icon name to `defaultIconUsage[weight]` (e.g. `regular`, `bold`, or `fill`).
3. Run: `node scripts/generate-icons.cjs`
4. `src/components/Icon/default-icons.ts` will regenerate automatically with the new icon paths.

