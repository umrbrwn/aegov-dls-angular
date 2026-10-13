---
name: using-modal-service
description: Use when programmatically opening confirmation dialogs, multi-action prompts, or custom component dialogs with ModalService.
---

# using-modal-service

Import:
`ModalService`, `ModalConfig`, `ModalRef`, `ModalAction`, `MODAL_DATA`, `ModalIconConfig`, `ModalSize`, `ModalVariant`, `ModalPlacement` from `aegov-dls-angular`

Related skill:
`components/ae-modal`

### ModalService Methods

- `open(config: ModalConfig): ModalRef`
- `open<T>(component: Type<T>, config?: ModalConfig): ModalRef`
- `open(template: TemplateRef<unknown>, config?: ModalConfig): ModalRef`

### ModalConfig Interface

```ts
interface ModalConfig {
  title?: string;
  body?: string; // Text or HTML string
  component?: Type<any>; // Custom component content
  template?: TemplateRef<unknown>; // Custom ng-template content
  icon?: IconName | ModalIconConfig; // e.g. 'warning', 'check-circle'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full'; // default: 'lg'
  variant?: 'default' | 'serious'; // default: 'default'
  placement?: 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'; // default: 'center'
  backdrop?: 'dynamic' | 'static'; // default: 'dynamic' ('static' prevents backdrop-click close)
  showBackdrop?: boolean; // default: true
  showCloseButton?: boolean; // default: false
  closeOnEscape?: boolean; // default: true
  actions?: ModalAction[]; // Action buttons in footer
  data?: any; // Injected into component via MODAL_DATA
  className?: string;
  dialogClassName?: string;
}
```

### ModalAction Interface

```ts
interface ModalAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'soft' | 'link' | 'danger'; // default: 'primary'
  value?: any; // Value passed to ref.afterClosed() when clicked
  closeOnClick?: boolean; // default: true
  /**
   * Custom click handler. Return false or Promise<false> to prevent modal from closing.
   */
  onClick?: (modalRef: ModalRef, event: MouseEvent) => void | boolean | Promise<void | boolean>;
}
```

### ModalRef API

Methods:
- `close(result?: any): void` — Closes the modal with an optional return value emitted to `afterClosed()`.
- `dismiss(): void` — Dismisses the modal without a result (emits `undefined`).
- `afterClosed(): Observable<any>` — Observable that emits the result when the modal closes.

### Usage Patterns

1. Confirmation & Alert Prompts:
```ts
const ref = this.modalService.open({
  title: 'Delete Application?',
  body: 'Are you sure you want to permanently delete this draft?',
  icon: 'warning',
  size: 'md',
  backdrop: 'static',
  actions: [
    { label: 'Yes, Delete', variant: 'secondary', value: true },
    { label: 'Cancel', variant: 'soft', value: false }
  ]
});

ref.afterClosed().subscribe((confirmed: boolean) => {
  if (confirmed) {
    this.deleteApplication();
  }
});
```

2. Multi-Action Workflow Dialog:
```ts
const ref = this.modalService.open({
  title: 'Unsaved Changes',
  body: 'You have unsaved changes in this form.',
  icon: 'warning',
  actions: [
    { label: 'Save Changes', variant: 'primary', value: 'save' },
    { label: 'Discard', variant: 'soft', value: 'discard' },
    { label: 'Cancel', variant: 'link', value: 'cancel' }
  ]
});

ref.afterClosed().subscribe(action => {
  if (action === 'save') this.save();
  else if (action === 'discard') this.revert();
});
```

3. Dynamic Custom Component Modal:
```ts
import { Component, inject } from '@angular/core';
import { MODAL_DATA, ModalRef, ButtonDirective, InputDirective, FormControlDirective } from 'aegov-dls-angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule, ButtonDirective, InputDirective, FormControlDirective],
  template: `
    <h3 class="text-lg font-bold mb-4">Edit Profile: {{ data.userName }}</h3>
    <div aeFormControl>
      <label for="profile-email">Email</label>
      <div class="form-control-input">
        <input aeInput id="profile-email" type="email" [(ngModel)]="email" />
      </div>
    </div>
    <div class="flex justify-end gap-3 mt-6">
      <button aeButton variant="soft" (click)="ref.close()">Cancel</button>
      <button aeButton (click)="save()">Save</button>
    </div>
  `
})
export class EditProfileModalComponent {
  data = inject(MODAL_DATA);
  ref = inject(ModalRef);
  email = this.data.email || '';

  save() {
    this.ref.close({ email: this.email });
  }
}

// In host component:
const ref = this.modalService.open(EditProfileModalComponent, {
  size: 'xl',
  data: { userName: 'Ahmed', email: 'ahmed@gov.ae' }
});

ref.afterClosed().subscribe(result => {
  if (result) console.log('Saved data:', result);
});
```
