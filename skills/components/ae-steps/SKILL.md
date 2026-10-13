---
name: ae-steps
description: Use when creating or configuring AEGov process steps with aegov-dls-angular.
---

# ae-steps

Import:
`StepsComponent`, `StepItem`, `StepsSize`, `StepsOrientation` from `aegov-dls-angular`

Selector: `ae-steps`

Inputs:
steps: StepItem[] # [{ label: string, href?: string }]
currentStep: number = 0
size: 'sm' | 'base' | 'lg' = 'base'
orientation: 'horizontal' | 'vertical' = 'horizontal'
showLabels: boolean
className: string

Outputs:
stepClick: OutputEmitterRef<number>

Example:
```html
<ae-steps
  [steps]="[
    { label: 'Applicant' },
    { label: 'Upload' },
    { label: 'Payment' },
    { label: 'Confirmation' }
  ]"
  [currentStep]="1"
  [showLabels]="true"
></ae-steps>
```
