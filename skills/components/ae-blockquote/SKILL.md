---
name: ae-blockquote
description: Use when styling native blockquote elements with the AEGov blockquote directive in aegov-dls-angular.
---

# ae-blockquote

Import:
`BlockquoteDirective`, `BlockquoteVariant` from `aegov-dls-angular`

Selector: `blockquote[aeBlockquote]`, `[aeBlockquote]`

Inputs:
variant: 'default' | 'colored' = 'default'
colored: boolean = false
className: string # alias: 'class'

Example:
```html
<blockquote aeBlockquote [colored]="true">
  <p>Continuous innovation is at the heart of our government strategy.</p>
  <div class="quote-footer">
    <div class="quote-author">Leadership Message</div>
    <div class="quote-cite">UAE Government</div>
  </div>
</blockquote>
```
