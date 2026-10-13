---
name: ae-avatar
description: Use when creating or configuring an AEGov avatar with aegov-dls-angular.
---

# ae-avatar

Import:
`AvatarComponent`, `AvatarSize`, `AvatarVariant`, `AvatarStatus` from `aegov-dls-angular`

Selector: `ae-avatar`

Inputs:
src: string
alt: string = 'User Avatar'
size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' = 'base'
variant: 'square' | 'rounded' = 'square'
status: 'online' | 'offline' | 'none' = 'none'
statusLabel: string
indicatorClass: string
noUser: boolean
className: string

Example:
```html
<ae-avatar src="/assets/user.jpg" size="lg" variant="rounded" status="online"></ae-avatar>
```
