---
name: ae-card
description: Use when creating or configuring AEGov cards and card groups with aegov-dls-angular.
---

# ae-card

Import:
`CardComponent`, `CardGroupComponent`, `CardVariant`, `CardSize` from `aegov-dls-angular`

Selector: `ae-card` / `ae-card-group`

Inputs:
variant: 'default' | 'news' | 'service' | 'creative' = 'default'
size: 'sm' | 'base' | 'lg' = 'base'
bordered: boolean
glow: boolean
title: string
description: string
imageSrc: string
imageAlt: string = 'Card image'
linkText: string
linkHref: string
className: string

Related:
`ae-card-group`

### ae-card-group

Inputs:
stacked: boolean
className: string

Example:
```html
<ae-card
  variant="service"
  title="Apply for Residency"
  description="Submit visa renewals online."
  linkText="Start Service"
  linkHref="/services/residency"
  [bordered]="true"
  [glow]="true"
></ae-card>
```
