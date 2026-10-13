---
name: ae-popover
description: Use when creating or configuring an AEGov popover with aegov-dls-angular.
---

# ae-popover

Import:
`PopoverComponent`, `PopoverTrigger`, `PopoverSide`, `PopoverAlign` from `aegov-dls-angular`

Selector: `ae-popover` (exportAs: `aePopover`)

Inputs:
id: string
title: string
description: string
triggerText: string = 'Default popover'
triggerVariant: 'solid' | 'outline' | 'soft' | 'link' = 'solid'
triggerColor: 'primary' | 'secondary' = 'primary'
trigger: 'click' | 'hover' = 'click'
side: 'top' | 'right' | 'bottom' | 'left' = 'bottom'
align: 'start' | 'center' | 'end' = 'center'
widthClass: string = 'w-64'
showCloseButton: boolean
closeOnOutsideClick: boolean = true
closeOnEscape: boolean = true
isOpen: boolean
hasCustomTrigger: boolean
disabled: boolean
className: string

Outputs:
openChange: OutputEmitterRef<boolean>
open: OutputEmitterRef<void>
close: OutputEmitterRef<void>

Methods:
openPopover(): void
closePopover(): void
toggle(): void

Example:
```html
<ae-popover
  title="Security Info"
  description="Stored safely and encrypted."
  triggerText="Learn more"
  side="top"
></ae-popover>
```
