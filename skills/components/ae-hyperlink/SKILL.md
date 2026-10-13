---
name: ae-hyperlink
description: Use when styling native anchor links with the AEGov hyperlink directive in aegov-dls-angular.
---

# ae-hyperlink

Import:
`HyperlinkDirective`, `HyperlinkVariant` from `aegov-dls-angular`

Selector: `a[aeHyperlink]`, `[aeHyperlink]`

Inputs:
variant: 'default' | 'cta' | 'soft' | 'secondary' | 'secondary-soft' | 'btn-outline' | 'btn-soft' = 'default'
color: 'primary' | 'secondary' = 'primary'
disabled: boolean = false
className: string # alias: 'class'

Example:
```html
<a aeHyperlink href="https://tdra.gov.ae" target="_blank">TDRA Portal</a>
<a aeHyperlink variant="cta" href="/services">
  <span>Apply for Services</span>
  <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100"></svg>
</a>
<a aeHyperlink variant="btn-outline" [routerLink]="['/register']">Register</a>
```
