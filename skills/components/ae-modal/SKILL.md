---
name: ae-modal
description: Use when creating or configuring AEGov modals and dialogs with aegov-dls-angular.
---

# ae-modal

Import:
`ModalComponent`, `ModalSize`, `ModalVariant`, `ModalPlacement`, `ButtonDirective` from `aegov-dls-angular`

Selector: `ae-modal` (exportAs: `aeModal`)

Inputs:
id: string
title: string
size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full' = 'lg'
variant: 'default' | 'serious' = 'default'
placement: 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'center'
backdrop: 'dynamic' | 'static' = 'dynamic'
showBackdrop: boolean = true
showCloseButton: boolean
closeAriaLabel: string
closeOnEscape: boolean = true
isOpen: boolean
wrapperBgClass: string
className: string
dialogClassName: string = ''

Outputs:
openChange: OutputEmitterRef<boolean>
open: OutputEmitterRef<void>
close: OutputEmitterRef<void>

Methods:
openModal(): void
closeModal(): void
toggle(): void

Related:
`using-modal-service`

Example:
```html
<ae-modal #modal title="Confirm" [isOpen]="isModalOpen" (close)="isModalOpen = false">
  <p>Are you sure you want to proceed?</p>
  <button aeButton variant="soft" (click)="modal.closeModal()">Cancel</button>
  <button aeButton (click)="submit()">Submit</button>
</ae-modal>
```
