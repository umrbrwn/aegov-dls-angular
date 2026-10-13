---
name: ae-alert
description: Use when creating or configuring an AEGov alert notification with aegov-dls-angular.
---

# ae-alert

Import:
`AlertComponent`, `AlertVariant`, `AlertTone` from `aegov-dls-angular`

Selector: `ae-alert`

Inputs:
variant: 'info' | 'error' | 'success' | 'warning' = 'info'
tone: 'soft' | 'solid' = 'soft'
title: string
content: string
showIcon: boolean = true
icon: IconName
dismissible: boolean
linkText: string
linkHref: string = '#'
className: string

Outputs:
dismiss: OutputEmitterRef<void>
onDismiss: OutputEmitterRef<void>

Methods:
show(): void

Example:
```html
<ae-alert
  variant="warning"
  title="Scheduled Maintenance"
  content="Portal maintenance tonight."
  [dismissible]="true"
></ae-alert>
```
