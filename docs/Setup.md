# Getting Started with aegov-dls-angular

`aegov-dls-angular` is the Angular component library for the UAE Government Design System (`@aegov/design-system`).

---

## 1. Installation

Install the package via npm:

```bash
npm install aegov-dls-angular
```

Requires Angular 19+:

- `@angular/core`: `^19.0.0`
- `@angular/common`: `^19.0.0`
- `@angular/forms`: `^19.0.0`
- `@angular/platform-browser`: `^19.0.0`
- `@angular/router`: `^19.0.0`

---

## 2. Style Setup

Choose one of the two options below depending on your project setup:

### Option 1: Tailwind CSS Projects (Minimal Setup)

If your Angular application already uses Tailwind CSS, simply import the precompiled design system stylesheet after your Tailwind import:

**In your `src/styles.css`:**
```css
@import 'tailwindcss';
@import 'aegov-dls-angular/styles.css';
```

---

### Option 2: Non-Tailwind Projects (Custom CSS, SCSS, or Other UI Libraries)

If your Angular application does not use Tailwind CSS (e.g. Vanilla CSS, SCSS, Bootstrap, or Material), import the precompiled stylesheet directly:

**In your `src/styles.css`:**
```css
@import 'aegov-dls-angular/styles.css';
```

*Or add it to `angular.json`:*
```json
"styles": [
  "node_modules/aegov-dls-angular/styles.css",
  "src/styles.css"
]
```

> [!CAUTION]
> If your project already includes another CSS framework (such as Bootstrap), global reset rules and shared class names may conflict if not properly managed in your cascade order. Ensure `aegov-dls-angular/styles.css` is ordered appropriately in your stylesheet imports to prevent unintentional overrides.

---

## 3. Using Components & Directives

All components and directives in `aegov-dls-angular` are standalone and can be imported directly into your components:

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

    <button aeButton variant="solid" color="primary" class="mt-4" (click)="onProceed()">
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
