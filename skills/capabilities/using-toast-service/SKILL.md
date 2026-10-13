---
name: using-toast-service
description: Use when programmatically creating, positioning, and managing floating toast notifications with ToastService.
---

# using-toast-service

Import:
`ToastService`, `ToastOptions`, `ToastVariant`, `ToastPosition` from `aegov-dls-angular`

Related skill:
`components/ae-toast`

### ToastService API

Methods:
show(options: ToastOptions | string): string
success(message: string, title?: string, options?: Partial<ToastOptions>): string
error(message: string, title?: string, options?: Partial<ToastOptions>): string
info(message: string, title?: string, options?: Partial<ToastOptions>): string
warning(message: string, title?: string, options?: Partial<ToastOptions>): string
dismiss(id: string): void
clear(): void

### ToastOptions Interface

```ts
interface ToastOptions {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error'; // default: 'info'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'; // default: 'top-right'
  duration?: number; // default: 5000 (ms). Set to 0 for persistent toast
  dismissible?: boolean; // default: true
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: string;
}
```

### Usage Patterns

1. Quick Feedback Messages:
```ts
import { Component, inject } from '@angular/core';
import { ToastService } from 'aegov-dls-angular';

@Component({ ... })
export class MyComponent {
  private toast = inject(ToastService);

  onSuccess() {
    this.toast.success('File uploaded successfully!', 'Upload Complete');
  }

  onError() {
    this.toast.error('Failed to submit form. Please check your inputs.', 'Validation Error');
  }
}
```

2. Interactive Toast with Action Button:
```ts
this.toast.show({
  title: 'Payment Received',
  message: 'Transaction #98421 completed successfully.',
  variant: 'success',
  position: 'top-right',
  actionText: 'View Receipt',
  onAction: () => this.router.navigate(['/receipt', 98421]),
  duration: 8000
});
```

3. Manual Dismissal:
```ts
const toastId = this.toast.show({ message: 'Uploading...', duration: 0 });

// Later when complete:
this.toast.dismiss(toastId);
```
