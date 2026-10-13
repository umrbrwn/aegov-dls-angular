---
name: ae-checkbox
description: Use when creating or configuring an AEGov checkbox with aegov-dls-angular.
---

# ae-checkbox

Import:
`CheckboxComponent`, `CheckboxSize`, `CheckboxVariant`, `CheckboxLayout` from `aegov-dls-angular`

Selector: `ae-checkbox`

Form Integration: `ControlValueAccessor` (`[(ngModel)]`, `[formControl]`)

Inputs:
id: string
name: string
value: string | number
label: string
description: string
size: 'sm' | 'base' | 'lg' = 'base'
variant: 'primary' | 'secondary' = 'primary'
layout: 'auto' | 'item' | 'group' | 'list' = 'auto'
checked: boolean
disabled: boolean
required: boolean
className: string

Outputs:
checkedChange: OutputEmitterRef<boolean>
onCheckedChange: OutputEmitterRef<boolean>
change: OutputEmitterRef<Event>

Example:
```html
<ae-checkbox label="I accept terms and conditions" [(ngModel)]="accepted"></ae-checkbox>
```
