---
name: cn-utility
description: Use when merging AEGov CSS class names and Tailwind utility classes cleanly with conflict resolution.
---

# cn-utility

Import:
`cn` from `aegov-dls-angular`

Signature:
cn(...inputs: ClassValue[]): string

Behavior:
Combines `clsx` (conditional class evaluation) with `tailwind-merge` (deduplicating conflicting Tailwind utility classes).

### Example

```ts
import { cn } from 'aegov-dls-angular';

const buttonClasses = cn(
  'px-4 py-2 rounded font-medium',
  isActive ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700',
  customClass
);
```
