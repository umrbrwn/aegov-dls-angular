---
name: ae-range-slider
description: Use when creating or configuring an AEGov range slider with aegov-dls-angular.
---

# ae-range-slider

Import:
`RangeSliderComponent`, `RangeSliderSize`, `RangeSliderVariant` from `aegov-dls-angular`

Selector: `ae-range-slider`

Form Integration: `ControlValueAccessor` (`[(ngModel)]`, `[formControl]`)

Inputs:
id: string
name: string
label: string
value: number = 20
min: number = 0
max: number = 100
step: number = 1
size: 'sm' | 'base' | 'lg' = 'base'
variant: 'primary' | 'secondary' = 'primary'
helperText: string
error: string
disabled: boolean
required: boolean
className: string

Outputs:
valueChange: OutputEmitterRef<number>
blur: OutputEmitterRef<void>
focus: OutputEmitterRef<void>

Example:
```html
<ae-range-slider label="Volume" [min]="0" [max]="100" [(ngModel)]="volume"></ae-range-slider>
```
