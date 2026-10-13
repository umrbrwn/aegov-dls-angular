---
name: ae-file-upload
description: Use when creating or configuring an AEGov file upload component with aegov-dls-angular.
---

# ae-file-upload

Import:
`FileUploadComponent`, `FileUploadVariant`, `FileUploadSize`, `FileUploadColor` from `aegov-dls-angular`

Selector: `ae-file-upload`

Inputs:
id: string
name: string
variant: 'button' | 'avatar' | 'dropzone' | 'native' = 'button'
color: 'primary' | 'secondary' = 'primary'
size: 'sm' | 'base' | 'lg' = 'base'
label: string = 'Upload file'
fieldLabel: string
helperText: string
dragDropText: string = 'or drag and drop'
accept: string
multiple: boolean
maxFiles: number = 10
maxSizeInMB: number = 50
showSummary: boolean = true
previewImage: string
icon: IconName
disabled: boolean
required: boolean
initialFiles: Array<string | File> = []
className: string

Outputs:
fileChange: OutputEmitterRef<File[]>
fileRemove: OutputEmitterRef<{ file: File; index: number }>
fileError: OutputEmitterRef<string>

Example:
```html
<ae-file-upload
  variant="dropzone"
  fieldLabel="Upload Documents"
  accept=".pdf,.png,.jpg"
  [multiple]="true"
  (fileChange)="onFilesSelected($event)"
></ae-file-upload>
```
