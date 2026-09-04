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

The library includes an inline SVG icon system sourced from the [Phosphor Icons](https://phosphoricons.com/) core pack ([`@phosphor-icons/core`](https://www.npmjs.com/package/@phosphor-icons/core)) with zero asset copying or `angular.json` configuration required. Built-in icons are pre-bundled and render as inline SVGs using `currentColor` for effortless Tailwind styling.

### 1. Basic Usage

Use `<ae-icon>` directly in any standalone component:

```typescript
import { Component } from '@angular/core';
import { IconComponent } from 'aegov-dls-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IconComponent],
  template: `
    <!-- Regular weight (default) -->
    <ae-icon name="check" [size]="20" class="text-primary-600"></ae-icon>

    <!-- Bold weight -->
    <ae-icon name="caret-down" weight="bold" [size]="16"></ae-icon>

    <!-- Fill weight -->
    <ae-icon name="star" weight="fill" [size]="24" class="text-amber-500"></ae-icon>
  `
})
export class ExampleComponent {}
```

### 2. Weights & Sizing

`<ae-icon>` supports 6 weight variants (`regular`, `bold`, `fill`, `light`, `thin`, `duotone`) and flexible sizing (number in pixels or CSS string):

```html
<ae-icon name="gear" weight="bold" [size]="28" class="text-primary-600"></ae-icon>
<ae-icon name="check-circle" weight="fill" [size]="32" class="text-emerald-600"></ae-icon>
```

### 3. Registering Custom Icons

You can register additional custom icons application-wide using `provideAeIcons` in your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAeIcons } from 'aegov-dls-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAeIcons({
      'custom-badge': '<path d="..." />',
    }),
  ],
};
```

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
