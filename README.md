# aegov-dls-angular

> **Disclaimer**: This is an **unofficial, community-driven Angular port** of the [UAE Government Design Language System](https://designsystem.gov.ae/) originally published as [`@aegov/design-system`](https://www.npmjs.com/package/@aegov/design-system). It is **NOT** an official release by or affiliated with the Telecommunications and Digital Government Regulatory Authority (TDRA).

A modern Angular 19+ component library implementing the UAE Government Design Language System (aegov DLS).

This package is ported from [`@aegov/design-system`](https://www.npmjs.com/package/@aegov/design-system), replacing vanilla JavaScript component behavior with native Angular implementation.

## About & Attribution

- **Original Design System**: Telecommunications and Digital Government Regulatory Authority (TDRA) — [designsystem.gov.ae](https://designsystem.gov.ae/)
- **Original Packages**: [`@aegov/design-system`](https://www.npmjs.com/package/@aegov/design-system)
- **Icon Set**: Sourced from [Phosphor Icons](https://phosphoricons.com/) via [`@phosphor-icons/core`](https://www.npmjs.com/package/@phosphor-icons/core) (licensed under MIT).

## Installation

```bash
npm install aegov-dls-angular
```

Requires Angular 19+:

- `@angular/core`: `^19.0.0`
- `@angular/common`: `^19.0.0`
- `@angular/forms`: `^19.0.0`
- `@angular/platform-browser`: `^19.0.0`
- `@angular/router`: `^19.0.0`

## Styling Setup

Add the stylesheet to your global CSS:

```css
/* For Tailwind CSS projects (in src/styles.css) */
@import 'tailwindcss';
@import 'aegov-dls-angular/styles.css';
```

```css
/* For Non-Tailwind / Custom CSS projects (in src/styles.css) */
@import 'aegov-dls-angular/styles.css';
```

*For detailed styling instructions, `angular.json` configurations, font setup, and multi-entity theming, see the [Setup Guide](docs/Setup.md) and [Customization Guide](docs/Customization.md).*

## Usage

Import standalone components and directives directly into your Angular components:

```typescript
import { Component } from '@angular/core';
import { AlertComponent, ButtonDirective } from 'aegov-dls-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlertComponent, ButtonDirective],
  template: `
    <ae-alert variant="info" title="Welcome">
      Welcome to the UAE Government Design System portal.
    </ae-alert>

    <button aeButton variant="solid" color="primary" (click)="onProceed()">
      Get Started
    </button>
  `,
})
export class AppComponent {
  onProceed(): void {
    console.log('Action triggered');
  }
}
```

## Icons

The library includes a lightweight, flexible inline SVG icon system with zero external font dependencies:

- **50+ Built-in Icons**: Pre-bundles essential Phosphor Icons required across components out-of-the-box.
- **Custom / Consumer Icons**: Easily register custom SVG paths at application startup using `provideAeIcons()`.
- **Direct SVG Rendering**: Pass SVG inner path markup directly to `<svg aeIcon [svg]="...">` without needing registration.
- **Color & Size Inheritance**: Automatically scales with `[size]`, inherits colors via `currentColor`, and mirrors in RTL layouts with standard Tailwind class `rtl:-scale-x-100`.

### Quick Example

```typescript
import { Component } from '@angular/core';
import { IconDirective } from 'aegov-dls-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IconDirective],
  template: `
    <!-- Built-in icons work out-of-the-box -->
    <svg aeIcon name="check" [size]="20" class="text-primary-600"></svg>
    <svg aeIcon name="caret-down" weight="bold" [size]="16"></svg>
    <svg aeIcon name="arrow-right" [size]="20" class="rtl:-scale-x-100"></svg>
  `
})
export class ExampleComponent {}
```

### Registering Custom Icons

```typescript
// In app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAeIcons } from 'aegov-dls-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAeIcons({
      heart: '<path d="M223,57a58.07,58.07,0,0,0-81.92,0l-13.1,13.1-13.1-13.1A58,58,0,0,0,33,139l13.1,13.1L128,234l81.9-81.9L223,139A58.07,58.07,0,0,0,223,57Z"/>',
    }),
  ],
};
```

*For the complete icon catalog, contributor sync scripts, weights, and detailed usage, see the [Icon System Guide](docs/Icons.md).*

## Documentation & Guides

- **[Setup & Getting Started](docs/Setup.md)**: Full setup details for Tailwind and non-Tailwind Angular applications.
- **[Customization & Theming](docs/Customization.md)**: Token-driven architecture, palette customization, fonts, and entity theming.
- **[Icon System Guide](docs/Icons.md)**: Built-in icon list, sync script architecture, and custom icon providers.

## AI Agents & LLM Support (`skills/`)

This package includes a structured [`skills/`](./skills/) directory for AI coding assistants (Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf):

- Point your agent to `node_modules/aegov-dls-angular/skills/` or copy it to `.agents/skills`.
- Contains modular skill files for all components, directives, form migration, and capabilities.

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
