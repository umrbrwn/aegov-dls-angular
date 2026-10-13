---
name: ae-badge
description: Use when styling native span or anchor badge indicators with the AEGov badge directive in aegov-dls-angular.
---

# ae-badge

Import:
`BadgeDirective`, `BadgeVariant`, `BadgeTone`, `BadgeSize` from `aegov-dls-angular`

Selector: `span[aeBadge]`, `a[aeBadge]`, `[aeBadge]`

Inputs:
variant: 'default' | 'info' | 'error' | 'success' | 'warning' = 'default'
tone: 'soft' | 'solid' = 'soft'
size: 'base' | 'lg' = 'base'
className: string # alias: 'class'

Example:
```html
<span aeBadge variant="success" tone="soft">Approved</span>
<a aeBadge href="/docs" variant="info" tone="solid" size="lg">Documentation</a>
```
