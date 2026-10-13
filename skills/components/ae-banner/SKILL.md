---
name: ae-banner
description: Use when creating or configuring an AEGov announcement banner with aegov-dls-angular.
---

# ae-banner

Import:
`BannerComponent`, `BannerPosition`, `BannerVariant`, `BannerAction` from `aegov-dls-angular`

Selector: `ae-banner`

Inputs:
position: 'top' | 'bottom' | 'static' = 'top'
variant: 'default' | 'camel' | 'red' | 'dark' | 'notice-primary' | 'notice-secondary' = 'default'
title: string
content: string
action: BannerAction # { text: string, href?: string, onClick?: () => void }
actionText: string
actionHref: string
dismissible: boolean
centered: boolean = true
sticky: boolean
role: string = 'region'
ariaLabel: string
className: string

Outputs:
dismiss: OutputEmitterRef<void>
onDismiss: OutputEmitterRef<void>
actionClick: OutputEmitterRef<MouseEvent>

Methods:
show(): void

Example:
```html
<ae-banner
  variant="camel"
  title="Notice"
  content="Offices closed on Sunday."
  actionText="Details"
  actionHref="/news"
  [dismissible]="true"
></ae-banner>
```
