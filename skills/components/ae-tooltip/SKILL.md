---
name: ae-tooltip
description: Use when attaching floating tooltips to interactive elements with the AEGov tooltip directive in aegov-dls-angular.
---

# ae-tooltip

Import:
`TooltipDirective`, `TooltipPlacement` from `aegov-dls-angular`

Selector: `[aeTooltip]`

Inputs:
aeTooltip: string
tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top'
tooltipSide: 'top' | 'right' | 'bottom' | 'left' # alias

Example:
```html
<button aeButton variant="solid" color="primary" aeTooltip="Submit your request" tooltipPlacement="top">
  Submit
</button>
<a aeHyperlink href="/help" aeTooltip="Read user guide" tooltipPlacement="right">
  Help Center
</a>
```
