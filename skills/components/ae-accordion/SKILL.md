---
name: ae-accordion
description: Use when creating or configuring an AEGov accordion with aegov-dls-angular.
---

# ae-accordion

Import:
`AccordionComponent`, `AccordionItemComponent`, `AccordionItemData` from `aegov-dls-angular`

Selector: `ae-accordion` / `ae-accordion-item`

Inputs:
items: AccordionItemData[] = [] # [{ value: string, title: string, content?: string, icon?: string, iconRotateDeg?: number }]
multiple: boolean
collapsible: boolean = true
defaultValue: string | string[]
icon: IconName = 'caret-down'
iconRotateDeg: number = 180

Outputs:
valueChange: OutputEmitterRef<string | string[]>
onValueChange: OutputEmitterRef<string | string[]>

Methods:
toggleItem(val: string): void
isItemOpen(val: string): boolean

Related:
`ae-accordion-item`

### ae-accordion-item

Inputs:
value: string (required)
title: string
content: string
icon: IconName
iconRotateDeg: number
borderNone: boolean

Methods:
toggle(): void

Example:
```html
<ae-accordion
  [items]="[
    { value: 'faq1', title: 'Question 1', content: 'Answer 1' },
    { value: 'faq2', title: 'Question 2', content: 'Answer 2' }
  ]"
></ae-accordion>
```
