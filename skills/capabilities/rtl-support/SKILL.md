---
name: rtl-support
description: Use when enabling and configuring Right-to-Left (RTL) Arabic layout and icon mirroring in aegov-dls-angular.
---

# rtl-support

AEGov DLS Angular natively supports Right-to-Left (RTL) layouts for Arabic interfaces.

### 1. Enabling RTL

Set `dir="rtl"` and `lang="ar"` on the root `<html>` or container element:

```html
<html dir="rtl" lang="ar">
```

### 2. Automatic Directional Mirroring

When `dir="rtl"` is present, components automatically adjust:
- Layout and flex orientations
- Text alignments (start/end)
- Padding and margin insets
- Dropdown and popover placement alignments (`align="start"`, `align="end"`)
- Drawer slide-out animation direction

### 3. Icon Flipping Behavior

Directional icons (arrows, chevrons, carets) are flipped horizontally in RTL mode directly with the Tailwind utility `rtl:-scale-x-100`:

- **`<svg aeIcon>`**:
  ```html
  <svg aeIcon name="arrow-right" class="rtl:-scale-x-100"></svg>
  ```

### Example

```html
<div dir="rtl" lang="ar" class="p-6">
  <h1 class="text-2xl font-bold mb-4">بوابة الخدمات الحكومية</h1>
  
  <button aeButton variant="solid" color="primary">
    <span>متابعة الطلب</span>
    <svg aeIcon name="arrow-right" [size]="16" class="rtl:-scale-x-100"></svg>
  </button>
  
  <a aeHyperlink href="/services" variant="cta">
    <span>عرض كافة الخدمات</span>
    <svg aeIcon name="arrow-right" [size]="20" class="rtl:-scale-x-100"></svg>
  </a>
</div>
```
