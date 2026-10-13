---
name: ae-textarea
description: Use when styling native multiline textareas with the AEGov textarea directive and form control wrapper in aegov-dls-angular.
---

# ae-textarea

Import:
`TextareaDirective`, `FormControlDirective` from `aegov-dls-angular`

Selector: `textarea[aeTextarea]`, `[aeTextarea]`

### TextareaDirective

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
<div aeFormControl [error]="descControl.touched && descControl.invalid">
  <label for="comments">Description</label>
  <div class="form-control-input">
    <textarea aeTextarea id="comments" rows="4" placeholder="Provide detailed feedback..." [formControl]="descControl" required></textarea>
  </div>
  @if (descControl.touched && descControl.invalid) {
    <p class="error-message">Description is required.</p>
  }
</div>
```
