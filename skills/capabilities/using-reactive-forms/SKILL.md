---
name: using-reactive-forms
description: Use when integrating AEGov form controls and directives with Angular Reactive Forms (FormGroup, FormControl, FormBuilder) or Template-Driven Forms (ngModel).
---

# using-reactive-forms

All AEGov form components and directive-styled native controls seamlessly integrate with Angular Reactive Forms (`formControl`, `formControlName`) and Template-Driven Forms (`[(ngModel)]`).

### Form Controls & Directives Overview

| Type | Syntax | Description |
| :--- | :--- | :--- |
| **Input Directive** | `<input aeInput ...>` inside `<div aeFormControl>` | Standard native text, email, number, search inputs |
| **Select Directive** | `<select aeSelect ...>` inside `<div aeFormControl>` | Standard native select dropdowns with options |
| **Textarea Directive** | `<textarea aeTextarea ...>` inside `<div aeFormControl>` | Standard native multi-line textareas |
| **Button Directive** | `<button aeButton type="submit">` | Form submit / reset / action buttons |
| **Checkbox Component** | `<ae-checkbox>` | Checkbox with CVA binding |
| **Radio Component** | `<ae-radio-group>` / `<ae-radio>` | Accessible radio button groups with CVA binding |
| **Toggle Component** | `<ae-toggle>` | Switch toggle with CVA binding |
| **Range Slider Component** | `<ae-range-slider>` | Numeric slider with CVA binding |
| **File Upload Component** | `<ae-file-upload>` | Drag-and-drop file upload |

---

### Standard Reactive Form Pattern

```ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  InputDirective,
  FormControlDirective,
  SelectDirective,
  ButtonDirective,
  CheckboxComponent,
  RadioGroupComponent
} from 'aegov-dls-angular';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputDirective,
    FormControlDirective,
    SelectDirective,
    ButtonDirective,
    CheckboxComponent,
    RadioGroupComponent
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6 max-w-lg p-6">
      <!-- Input Field -->
      <div aeFormControl [error]="isFieldInvalid('fullName')">
        <label for="fullName">
          Full Name
          <span class="text-aered-600 ms-0.5">*</span>
        </label>
        <div class="form-control-input">
          <input
            aeInput
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            formControlName="fullName"
          />
        </div>
        @if (isFieldInvalid('fullName')) {
          <p class="error-message">Full name is required.</p>
        }
      </div>

      <!-- Select Dropdown -->
      <div aeFormControl [error]="isFieldInvalid('emirate')">
        <label for="emirate">
          Emirate
          <span class="text-aered-600 ms-0.5">*</span>
        </label>
        <div class="form-control-input">
          <select aeSelect id="emirate" formControlName="emirate">
            <option value="" disabled>Select an emirate</option>
            @for (em of emirates; track em.value) {
              <option [value]="em.value">{{ em.label }}</option>
            }
          </select>
        </div>
      </div>

      <!-- Radio Group -->
      <ae-radio-group
        [options]="serviceTypes"
        formControlName="serviceType"
      ></ae-radio-group>

      <!-- Checkbox -->
      <ae-checkbox
        label="I accept terms and conditions"
        formControlName="terms"
      ></ae-checkbox>

      <!-- Submit Button -->
      <button
        aeButton
        variant="solid"
        color="primary"
        type="submit"
        [disabled]="form.invalid"
      >
        Submit Application
      </button>
    </form>
  `
})
export class ApplicationFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    fullName: ['', Validators.required],
    emirate: ['dubai', Validators.required],
    serviceType: ['standard', Validators.required],
    terms: [false, Validators.requiredTrue]
  });

  readonly emirates = [
    { value: 'abu-dhabi', label: 'Abu Dhabi' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'sharjah', label: 'Sharjah' }
  ];

  readonly serviceTypes = [
    { label: 'Standard (48h)', value: 'standard' },
    { label: 'Express (24h)', value: 'express' }
  ];

  isFieldInvalid(name: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl && ctrl.touched && ctrl.invalid);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Submitted:', this.form.value);
    }
  }
}
```

---

### Automatic ARIA Accessibility Wiring (`aeFormControl`)

The wrapper `<div aeFormControl>` automatically wires accessible WCAG relationships without requiring manual ID management:

- **Label Linking**: Automatically associates `<label>` with the nested input if `id` / `for` are omitted.
- **Error Describedby (`.error-message`)**: Any element with class `.error-message` (or `[role="alert"]`) inside `aeFormControl` is automatically assigned an ID and linked to the input via `aria-describedby` and sets `aria-invalid="true"` whenever `[error]="true"`.
- **Helper Text Describedby (`.helper-text`)**: Any element with class `.helper-text` (or `.form-text`) is automatically linked to the input via `aria-describedby` when not in an error state.

