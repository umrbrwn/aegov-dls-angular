---
name: using-custom-icons
description: Use when registering, configuring, and rendering custom SVG icons in aegov-dls-angular using provideAeIcons and AeIconRegistry.
---

# using-custom-icons

Import:
`provideAeIcons`, `AeIconRegistry`, `IconDirective`, `IconWeight`, `IconDefinition` from `aegov-dls-angular`

Related skill:
`components/ae-icon`

### 1. Global Provider Setup (`provideAeIcons`)

Register icons globally in `main.ts` or `app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideAeIcons } from 'aegov-dls-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAeIcons({
      'uae-pass': '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
      'emirates-id': '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/>'
    }, 'regular')
  ]
};
```

### 2. Runtime Icon Registration (`AeIconRegistry`)

Inject `AeIconRegistry` to register icons dynamically at runtime:

```ts
import { Component, inject } from '@angular/core';
import { AeIconRegistry, IconDirective } from 'aegov-dls-angular';

@Component({
  imports: [IconDirective],
  template: `<svg aeIcon name="custom-logo" [size]="24"></svg>`
})
export class CustomIconDemoComponent {
  private registry = inject(AeIconRegistry);

  constructor() {
    // Single icon
    this.registry.registerIcon('custom-logo', '<path d="..." />', 'regular');

    // Batch icons
    this.registry.registerIcons({
      'flag-ae': '<path d="..." />',
      'falcon': '<path d="..." />'
    }, 'bold');
  }
}
```

### 3. AeIconRegistry API

Methods:
registerIcon(name: string, svg: string, weight?: IconWeight): void
registerIcons(icons: Record<string, string>, weight?: IconWeight): void
getIcon(name: string, weight?: IconWeight): string | undefined
hasIcon(name: string, weight?: IconWeight): boolean

### 4. Icon Weights

Supported Weights:
`'regular'` | `'bold'` | `'fill'` | `'light'` | `'thin'` | `'duotone'`

### 5. Rendering Registered & Inline Icons

Using directive on native `<svg>`:
```html
<!-- Registered icon -->
<svg aeIcon name="uae-pass" [size]="24" weight="bold"></svg>

<!-- Direct SVG paths without registry lookup -->
<svg aeIcon [svg]="rawPathString" [size]="20"></svg>

<!-- RTL flipping (mirrors icon in RTL layout) -->
<svg aeIcon name="arrow-right" [size]="20" class="rtl:-scale-x-100"></svg>
```
