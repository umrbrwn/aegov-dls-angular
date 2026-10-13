---
name: ae-toggle
description: Use when creating or configuring an AEGov toggle switch with aegov-dls-angular.
---

# ae-toggle

Import:
`ToggleComponent`, `ToggleVariant` from `aegov-dls-angular`

Selector: `ae-toggle`

Form Integration: `ControlValueAccessor` (`[(ngModel)]`, `[formControl]`)

Inputs:
id: string
name: string
value: string
variant: 'default' | 'primary' | 'success' | 'mode' | 'secondary' = 'default'
checked: boolean
label: string
srOnlyLabel: string
withIcon: boolean
disabled: boolean
required: boolean
className: string

Outputs:
checkedChange: OutputEmitterRef<boolean>
change: OutputEmitterRef<Event>

Example:
```html
<ae-toggle label="Dark Mode" variant="mode" [(ngModel)]="isDarkMode"></ae-toggle>
```
