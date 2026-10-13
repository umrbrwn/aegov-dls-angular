---
name: ae-select
description: Use when styling native select dropdowns with the AEGov select directive and form control wrapper in aegov-dls-angular.
---

# ae-select

Import:
`SelectDirective`, `SelectOption`, `FormControlDirective` from `aegov-dls-angular`

Selector: `select[aeSelect]`, `[aeSelect]`

### SelectDirective

Inputs:
options: (SelectOption | string)[] # [{ value: string | number, label: string, disabled?: boolean }]
placeholder: string
className: string # alias: 'class'

### FormControlDirective (div[aeFormControl])

Inputs:
size: 'sm' | 'base' | 'lg' = 'base'
variant: 'primary' | 'secondary' = 'primary'
error: boolean = false
className: string # alias: 'class'

Example:
```html
<div aeFormControl>
  <label for="emirate">Emirate</label>
  <div class="form-control-input">
    <select aeSelect id="emirate" [options]="emirateOptions" placeholder="Select an option" [formControl]="emirateControl"></select>
  </div>
</div>
```
