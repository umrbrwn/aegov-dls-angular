---
name: ae-toast
description: Use when creating or configuring AEGov toast notification elements with aegov-dls-angular.
---

# ae-toast

Import:
`ToastComponent` from `aegov-dls-angular`

Selector: `ae-toast` / `ae-toast-container`

Inputs:
id: string
title: string
message: string
icon: string = 'info'
iconColor: string = 'text-primary-600'
iconSize: number = 32
actionText: string
actionHref: string
dismissible: boolean = true
dismissAriaLabel: string = 'Close'
show: boolean = true
className: string

Outputs:
dismiss: OutputEmitterRef<void>
actionClick: OutputEmitterRef<MouseEvent>

Methods:
dismissToast(): void

Related:
`using-toast-service`

Example:
```html
<ae-toast
  title="Upload Complete"
  message="Your file was saved successfully."
  icon="check-circle"
  iconColor="text-aegreen-600"
  [dismissible]="true"
></ae-toast>
```

