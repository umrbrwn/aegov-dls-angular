---
name: ae-pagination
description: Use when creating or configuring AEGov pagination with aegov-dls-angular.
---

# ae-pagination

Import:
`PaginationComponent`, `PageItem` from `aegov-dls-angular`

Selector: `ae-pagination`

Inputs:
currentPage: number = 1
totalPages: number = 1
showFirstLast: boolean
previousLabel: string = 'Previous'
nextLabel: string = 'Next'
firstLabel: string = 'First'
lastLabel: string = 'Last'
pageLabel: string = 'Page'
ofLabel: string = 'of'
pageUrlTemplate: string # e.g. '?page={page}'
className: string

Outputs:
pageChange: OutputEmitterRef<number>
onPageChange: OutputEmitterRef<number>

Example:
```html
<ae-pagination
  [currentPage]="page"
  [totalPages]="totalPages"
  [showFirstLast]="true"
  (pageChange)="onPageChanged($event)"
></ae-pagination>
```
