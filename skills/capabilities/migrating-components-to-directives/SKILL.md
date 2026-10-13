---
name: migrating-components-to-directives
description: Use when converting legacy aegov-dls-angular component wrappers (<ae-input>, <ae-button>, <ae-select>, etc.) to modern native HTML directive-based styling ([aeInput], [aeButton], [aeSelect], etc.).
---

# Migrating Components to Directives

In `aegov-dls-angular`, primitive UI controls were migrated from heavy wrapper Angular components (`<ae-...>`) to lightweight, native HTML directives (`[ae...]`). This eliminates artificial DOM wrapper shells and allows full access to native HTML attributes, Angular Router directives, and standard Reactive Forms bindings.

---

## Migration Cheatsheet

| Primitive | Legacy Component | Modern Directive Approach |
| :--- | :--- | :--- |
| **Button** | `<ae-button>` | `<button aeButton>` or `<a aeButton>` |
| **Input** | `<ae-input>` | `<input aeInput>` inside `<div aeFormControl>` |
| **Select** | `<ae-select>` | `<select aeSelect>` inside `<div aeFormControl>` |
| **Textarea** | `<ae-textarea>` | `<textarea aeTextarea>` inside `<div aeFormControl>` |
| **Hyperlink** | `<ae-hyperlink>` | `<a aeHyperlink>` |
| **Badge** | `<ae-badge>` | `<span aeBadge>` or `<a aeBadge>` |
| **Blockquote** | `<ae-blockquote>` | `<blockquote aeBlockquote>` |
| **Icon** | `<ae-icon>` | `<svg aeIcon>` |
| **Tooltip** | `<ae-tooltip>` | `[aeTooltip]` attribute on any element |

---

## 1. Button

### Before (Component)
```html
<ae-button variant="solid" color="primary" (click)="save()">
  Save Changes
</ae-button>
<ae-button isIcon icon="magnifying-glass" ariaLabel="Search"></ae-button>
```

### After (Directive)
```html
<!-- Native <button> element -->
<button aeButton variant="solid" color="primary" (click)="save()">
  Save Changes
</button>

<!-- Icon-only button with nested SVG -->
<button aeButton [isIcon]="true" aria-label="Search">
  <svg aeIcon name="magnifying-glass" [size]="18"></svg>
</button>

<!-- Button styled as Anchor link -->
<a aeButton href="/dashboard" variant="outline">
  Dashboard
</a>
```

### Input & Attribute Mapping
* `variant` $\rightarrow$ `variant`: `'solid' | 'outline' | 'soft' | 'link'`
* `color` $\rightarrow$ `color`: `'primary' | 'secondary'`
* `size` $\rightarrow$ `size`: `'xs' | 'sm' | 'base' | 'lg'`
* `isIcon` $\rightarrow$ `[isIcon]="true"`
* `disabled` $\rightarrow$ `[disabled]="boolean"`
* `type`, `href`, `aria-label`, `target` $\rightarrow$ Native HTML attributes directly on `<button>` or `<a>`

---

## 2. Input Field & Form Control

### Before (Component)
```html
<ae-input
  label="Email Address"
  type="email"
  placeholder="name@example.com"
  [formControl]="emailControl"
  [error]="emailControl.invalid ? 'Invalid email' : undefined"
  helperText="We will never share your email."
  required
></ae-input>
```

### After (Directive + aeFormControl Wrapper)
```html
<div aeFormControl [error]="emailControl.touched && emailControl.invalid">
  <label for="email">
    Email Address
    <span class="text-aered-600 ms-0.5">*</span>
  </label>
  <div class="form-control-input">
    <input
      aeInput
      id="email"
      type="email"
      placeholder="name@example.com"
      [formControl]="emailControl"
      required
    />
  </div>
  @if (emailControl.touched && emailControl.invalid) {
    <p class="error-message">Invalid email address.</p>
  } @else {
    <p class="mt-2 text-xs leading-6 text-aeblack-500">We will never share your email.</p>
  }
</div>
```

### Prefix / Suffix Icons in Inputs
```html
<div aeFormControl>
  <label for="search">Search</label>
  <div class="form-control-input">
    <span class="control-prefix">
      <svg aeIcon name="magnifying-glass" [size]="20" class="w-5 h-5"></svg>
    </span>
    <input aeInput id="search" type="search" placeholder="Search..." />
    <span class="control-suffix">
      <span>.gov.ae</span>
    </span>
  </div>
</div>
```

### Input & Attribute Mapping
* `[size]`, `[variant]`, `[error]` $\rightarrow$ Moved to wrapper `<div aeFormControl [size]="..." [variant]="..." [error]="...">`
* `type`, `placeholder`, `disabled`, `required`, `readonly`, `name`, `id`, `value` $\rightarrow$ Native HTML `<input>` attributes
* `[formControl]`, `formControlName`, `[(ngModel)]` $\rightarrow$ Direct binding on `<input aeInput>`
* `prefixIcon`, `suffixIcon` $\rightarrow$ `<span class="control-prefix"><svg aeIcon ...></span>`

---

## 3. Select Dropdown

### Before (Component)
```html
<ae-select
  label="Country"
  [options]="countries"
  placeholder="Select country"
  [(ngModel)]="selectedCountry"
></ae-select>
```

### After (Directive + aeFormControl Wrapper)
```html
<div aeFormControl>
  <label for="country">Country</label>
  <div class="form-control-input">
    <select aeSelect id="country" [(ngModel)]="selectedCountry">
      <option value="" disabled selected>Select country</option>
      @for (c of countries; track c.value) {
        <option [value]="c.value">{{ c.label }}</option>
      }
    </select>
  </div>
</div>
```

### Input & Attribute Mapping
* `options` array $\rightarrow$ Native `<option>` elements using `@for` or standard markup
* `placeholder` $\rightarrow$ `<option value="" disabled selected>Placeholder</option>`
* `disabled`, `required`, `name`, `id` $\rightarrow$ Native HTML `<select>` attributes

---

## 4. Textarea

### Before (Component)
```html
<ae-textarea
  label="Message"
  [rows]="4"
  placeholder="Enter feedback..."
  [formControl]="msgControl"
></ae-textarea>
```

### After (Directive + aeFormControl Wrapper)
```html
<div aeFormControl [error]="msgControl.touched && msgControl.invalid">
  <label for="msg">Message</label>
  <div class="form-control-input">
    <textarea
      aeTextarea
      id="msg"
      rows="4"
      placeholder="Enter feedback..."
      [formControl]="msgControl"
    ></textarea>
  </div>
</div>
```

---

## 5. Hyperlink

### Before (Component)
```html
<ae-hyperlink href="/services" variant="cta">
  Our Services
</ae-hyperlink>
```

### After (Directive)
```html
<!-- External / regular URL -->
<a aeHyperlink href="https://u.ae" target="_blank" variant="cta">
  <span>Explore UAE Portal</span>
  <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
</a>

<!-- Angular Router Link -->
<a aeHyperlink [routerLink]="['/services']" variant="soft">
  Our Services
</a>

<!-- Link Styled as Button -->
<a aeHyperlink [routerLink]="['/register']" variant="btn-outline">
  Register
</a>
```

### Input & Attribute Mapping
* `variant` $\rightarrow$ `'default' | 'cta' | 'soft' | 'secondary' | 'secondary-soft' | 'btn-outline' | 'btn-soft'`
* `color` $\rightarrow$ `'primary' | 'secondary'`
* `href`, `[routerLink]`, `target`, `rel`, `disabled` $\rightarrow$ Native `<a>` attributes

---

## 6. Badge

### Before (Component)
```html
<ae-badge variant="success" tone="soft" label="Approved"></ae-badge>
```

### After (Directive)
```html
<span aeBadge variant="success" tone="soft">Approved</span>

<!-- Badge with icon -->
<span aeBadge variant="info" tone="solid" size="lg">
  <svg aeIcon name="info" [size]="16" class="badge-icon"></svg>
  <span>Documentation</span>
</span>

<!-- Interactive link badge -->
<a aeBadge href="/status" variant="warning" tone="soft">
  Pending Review
</a>
```

---

## 7. Blockquote

### Before (Component)
```html
<ae-blockquote
  quote="Innovation distinguishes between a leader and a follower."
  author="Steve Jobs"
  [colored]="true"
></ae-blockquote>
```

### After (Directive)
```html
<blockquote aeBlockquote [colored]="true">
  <svg aeIcon name="quotes" class="quote-icon -scale-x-100 rtl:scale-x-100" [size]="48"></svg>
  <p>Innovation distinguishes between a leader and a follower.</p>
  <div class="quote-footer">
    <div class="quote-author">Steve Jobs</div>
    <div class="quote-cite">Apple Inc.</div>
  </div>
</blockquote>
```

---

## 8. Icon

### Before (Component)
```html
<ae-icon name="user" [size]="24"></ae-icon>
```

### After (Directive)
```html
<svg aeIcon name="user" [size]="24"></svg>
<svg aeIcon name="arrow-right" [size]="20" class="text-primary-600 rtl:-scale-x-100"></svg>
<svg aeIcon name="check-circle" weight="fill" [size]="16"></svg>
```

---

## 9. Tooltip

### Before (Component Wrapper)
```html
<ae-tooltip content="Copy text" placement="top">
  <button aeButton>Copy</button>
</ae-tooltip>
```

### After (Directive)
```html
<button aeButton aeTooltip="Copy text" tooltipPlacement="top">
  Copy
</button>
```
