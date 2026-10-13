---
name: ae-input
description: Use when styling native input fields with the AEGov input directive and form control wrapper in aegov-dls-angular.
---

# ae-input

Import:
`InputDirective`, `FormControlDirective`, `InputSize`, `InputVariant` from `aegov-dls-angular`

Selector: `input[aeInput]`, `[aeInput]`

### InputDirective

Inputs:
className: string # alias: 'class'

### FormControlDirective (div[aeFormControl])

Inputs:
size: 'sm' | 'base' | 'lg' = 'base'
variant: 'primary' | 'secondary' = 'primary'
error: boolean = false
className: string # alias: 'class'

Example:
```html
<div aeFormControl [error]="emailControl.touched && emailControl.invalid">
  <label for="email">Email Address</label>
  <div class="form-control-input">
    <span class="control-prefix">
      <svg aeIcon name="envelope" [size]="20"></svg>
    </span>
    <input aeInput id="email" type="email" placeholder="name@example.gov.ae" [formControl]="emailControl" required />
  </div>
  @if (emailControl.touched && emailControl.invalid) {
    <p class="error-message">A valid email is required.</p>
  }
</div>
```
