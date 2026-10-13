---
name: ae-tabs
description: Use when creating or configuring AEGov navigation tabs with aegov-dls-angular.
---

# ae-tabs

Import:
`TabsComponent`, `TabItem`, `TabsVariant` from `aegov-dls-angular`

Selector: `ae-tabs`

Inputs:
id: string
items: TabItem[] # [{ value: string, label: string, content?: string, icon?: string }]
variant: 'default' | 'compact' | 'pills' = 'default'
defaultValue: string
className: string

Outputs:
tabChange: OutputEmitterRef<string>

Example:
```html
<ae-tabs
  [items]="[
    { value: 'tab1', label: 'Personal Details', icon: 'user' },
    { value: 'tab2', label: 'Documents', icon: 'file' },
    { value: 'tab3', label: 'Review', icon: 'check-square' }
  ]"
  defaultValue="tab1"
></ae-tabs>
```
