---
name: ae-icon
description: Use when rendering AEGov vector icons or inline SVG icons with aegov-dls-angular.
---

# ae-icon

Import:
`IconDirective`, `IconName`, `IconWeight` from `aegov-dls-angular`

Selector: `svg[aeIcon], [aeIcon]`

Inputs:
name: IconName
svg: string # Raw SVG paths for zero-lookup rendering
weight: 'regular' | 'bold' | 'fill' | 'light' | 'thin' | 'duotone' = 'regular'
size: number | string = undefined
className: string # alias: 'class'

Related:
`using-custom-icons`, `cn-utility`

Example:
```html
<svg aeIcon name="check" [size]="20" weight="bold"></svg>
<svg aeIcon name="arrow-right" [size]="20" class="rtl:-scale-x-100"></svg>
<svg aeIcon name="warning" [size]="24" aria-label="System Warning"></svg>
```
