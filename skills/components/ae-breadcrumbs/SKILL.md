---
name: ae-breadcrumbs
description: Use when creating or configuring AEGov breadcrumbs with aegov-dls-angular.
---

# ae-breadcrumbs

Import:
`BreadcrumbsComponent`, `BreadcrumbItem`, `BreadcrumbSeparator` from `aegov-dls-angular`

Selector: `ae-breadcrumbs`

Inputs:
items: BreadcrumbItem[] # [{ label: string, href?: string, title?: string, icon?: string }]
separator: 'slash' | 'caret' | 'none' = 'slash'
showHomeIcon: boolean
microdata: boolean
ariaLabel: string = 'Breadcrumb'
className: string

Example:
```html
<ae-breadcrumbs
  [items]="[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Visas', href: '/services/visas' }
  ]"
  [showHomeIcon]="true"
  separator="slash"
></ae-breadcrumbs>
```
