---
name: ae-radio
description: Use when creating or configuring AEGov radio inputs and radio groups with aegov-dls-angular.
---

# ae-radio

Import:
`RadioComponent`, `RadioGroupComponent`, `RadioOption`, `RadioSize`, `RadioVariant`, `RadioLayout`, `RadioOrientation` from `aegov-dls-angular`

Selector: `ae-radio` / `ae-radio-group`

Form Integration: `ControlValueAccessor` (`[(ngModel)]`, `[formControl]`)

### ae-radio-group

Inputs:
name: string
value: any
options: RadioOption[] # [{ label: string, value: any, description?: string, disabled?: boolean }]
size: 'sm' | 'base' | 'lg' = 'base'
variant: 'primary' | 'secondary' = 'primary'
layout: 'auto' | 'item' | 'group' | 'list' = 'auto'
orientation: 'horizontal' | 'vertical' = 'vertical'
disabled: boolean
required: boolean
className: string

Outputs:
valueChange: OutputEmitterRef<any>
change: OutputEmitterRef<any>

### ae-radio

Inputs:
id: string
name: string
value: any
label: string
description: string
size: 'sm' | 'base' | 'lg' = 'base'
variant: 'primary' | 'secondary' = 'primary'
layout: 'auto' | 'item' | 'group' | 'list' = 'auto'
disabled: boolean
required: boolean
checked: boolean
className: string

Outputs:
checkedChange: OutputEmitterRef<boolean>
valueChange: OutputEmitterRef<any>
change: OutputEmitterRef<Event>

Example:
```html
<ae-radio-group [options]="deliveryOptions" [(ngModel)]="selectedDelivery"></ae-radio-group>
```
