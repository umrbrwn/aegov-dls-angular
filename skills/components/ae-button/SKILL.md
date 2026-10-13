---
name: ae-button
description: Use when styling native button and anchor elements with the AEGov button directive in aegov-dls-angular.
---

# ae-button

Import:
`ButtonDirective`, `AegovButtonVariant`, `AegovButtonColor`, `AegovButtonSize` from `aegov-dls-angular`

Selector: `button[aeButton]`, `a[aeButton]`, `[aeButton]`

Inputs:
variant: 'solid' | 'outline' | 'soft' | 'link' = 'solid'
color: 'primary' | 'secondary' = 'primary'
size: 'xs' | 'sm' | 'base' | 'lg' = 'base'
isIcon: boolean = false
disabled: boolean = false
className: string # alias: 'class'

Example:
```html
<button aeButton variant="solid" color="primary" type="submit">Submit</button>
<button aeButton variant="outline" size="sm" (click)="cancel()">Cancel</button>
<a aeButton href="/home" variant="soft">Return Home</a>
<button aeButton [isIcon]="true" aria-label="Search">
  <svg aeIcon name="magnifying-glass" [size]="18"></svg>
</button>
```
