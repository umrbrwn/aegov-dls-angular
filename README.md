# aegov-dls-angular

> **⚠️ Disclaimer**: This is an **unofficial, community-driven Angular port** of the [UAE Government Design Language System](https://designsystem.gov.ae/) originally published as [`@aegov/design-system`](https://www.npmjs.com/package/@aegov/design-system). It is **NOT** an official release by or affiliated with the Telecommunications and Digital Government Regulatory Authority (TDRA).

A modern Angular 19+ component library implementing the UAE Government Design Language System (aegov DLS). Built using Standalone Components, Signals, modern control flow (`@if`, `@for`), Tailwind CSS v4, and Angular CDK.

## About & Attribution

- **Original Design System**: Telecommunications and Digital Government Regulatory Authority (TDRA) — [designsystem.gov.ae](https://designsystem.gov.ae/)
- **Original Packages**: [`@aegov/design-system`](https://www.npmjs.com/package/@aegov/design-system) / [`@aegov/design-system-react`](https://www.npmjs.com/package/@aegov/design-system-react)
- **Icon Set**: Sourced from [Phosphor Icons](https://phosphoricons.com/) via [`@phosphor-icons/core`](https://www.npmjs.com/package/@phosphor-icons/core) (licensed under MIT).

## Installation

```bash
npm install aegov-dls-angular @angular/cdk
```

## Styling Setup

Include the UAE Gov Tailwind CSS v4 styles in your application's global stylesheet or `angular.json`:

```css
/* in your global styles.css */
@import "aegov-dls-angular/styles/tailwind.css";
```

## Usage

Import the standalone components directly into your Angular components:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, AlertComponent, InputComponent } from 'aegov-dls-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, AlertComponent, InputComponent],
  template: `
    <ae-alert variant="info" title="Welcome to UAE Gov DLS (Angular)">
      Community-maintained Angular implementation of the UAE Government Design System.
    </ae-alert>

    <ae-button color="primary" variant="solid" size="base">
      Submit Application
    </ae-button>
  `
})
export class AppComponent {}
```

## Icons

The library includes a lightweight, flexible inline SVG icon system with zero external font dependencies:

- **Built-in Icons (Zero Config)**: Pre-bundles 22 essential icons required by UAE Gov DLS components (`Alert`, `Select`, `Toast`, `Pagination`, `FileUpload`, `Accordion`, `Input`, etc.) out-of-the-box.
- **Custom / Consumer Icons**: Easily register custom SVG paths at application startup using `provideAeIcons()`.
- **Direct SVG Rendering**: Pass SVG inner path markup directly to `<ae-icon [svg]="...">` without needing registration.
- **Color & Size Inheritance**: Automatically scales with `[size]` and inherits colors via `currentColor` (fully compatible with Tailwind text color utilities like `text-primary-600`, `text-emerald-500`, etc.).

### 1. Built-in Icons Usage

Use `<ae-icon>` in any standalone component:

```typescript
import { Component } from '@angular/core';
import { IconComponent } from 'aegov-dls-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IconComponent],
  template: `
    <!-- Built-in icons work out-of-the-box -->
    <ae-icon name="check" [size]="20" class="text-primary-600"></ae-icon>
    <ae-icon name="caret-down" weight="bold" [size]="16"></ae-icon>
    <ae-icon name="check-circle" weight="fill" [size]="24" class="text-emerald-500"></ae-icon>
  `
})
export class ExampleComponent {}
```

#### Pre-bundled Icon Names:
`caret-double-left`, `caret-double-right`, `caret-down`, `caret-left`, `caret-right`, `caret-up`, `check`, `check-circle`, `eye`, `eye-slash`, `house`, `image`, `info`, `list`, `magnifying-glass`, `moon`, `sun`, `upload-simple`, `user`, `warning`, `x`, `x-circle`.

### 2. Registering Custom Icons (`provideAeIcons`)

Register custom icons (or additional Phosphor / branded SVGs) in your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAeIcons } from 'aegov-dls-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAeIcons({
      heart: '<path d="M223,57a58.07,58.07,0,0,0-81.92,0l-13.1,13.1-13.1-13.1A58,58,0,0,0,33,139l13.1,13.1L128,234l81.9-81.9L223,139A58.07,58.07,0,0,0,223,57Z"/>',
      gear: '<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>',
    }),
  ],
};
```

Then use anywhere in your templates:

```html
<ae-icon name="heart" [size]="24" class="text-red-500"></ae-icon>
<ae-icon name="gear" [size]="24" class="text-gray-600"></ae-icon>
```

### 3. Direct SVG Input (`[svg]`)

Pass raw SVG `<path>` markup directly via `[svg]` without registering in the registry:

```typescript
import { Component } from '@angular/core';
import { IconComponent } from 'aegov-dls-angular';

@Component({
  standalone: true,
  imports: [IconComponent],
  template: `<ae-icon [svg]="customSvg" [size]="24" class="text-amber-500"></ae-icon>`
})
export class CustomIconComponent {
  readonly customSvg = '<path d="..."/>';
}
```

## AI Agents & LLM Support (`llms.txt`)

This package includes a structured [`llms.txt`](./llms.txt) specification. When building applications with AI coding assistants (Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf):

- **In consuming apps**: Point your agent to `node_modules/aegov-dls-angular/llms.txt` or copy its contents into your project's `.cursorrules`, `AGENTS.md`, `CLAUDE.md`, or `.github/copilot-instructions.md`.
- All components, inputs, outputs, icon names, and standalone usage examples are documented in machine-readable format.

## Storybook Development

To explore all components, variants, and interactive documentation:

```bash
npm run storybook
```

## Building the Library

```bash
npm run build
```

## License

MIT
