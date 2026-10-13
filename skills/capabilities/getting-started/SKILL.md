---
name: getting-started
description: Use when setting up aegov-dls-angular, including provider configuration, icons, and styles.
---

# getting-started

Package: `aegov-dls-angular` (Angular 19+ standalone components & directives)

### Setup

```ts
// main.ts or app.config.ts
import { provideAeIcons } from 'aegov-dls-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAeIcons({
      'custom-icon': '<path d="..." />'
    })
  ]
};
```

### Styles

```css
/* angular.json or global styles.css */
@import "aegov-dls-angular/styles.css";
```
