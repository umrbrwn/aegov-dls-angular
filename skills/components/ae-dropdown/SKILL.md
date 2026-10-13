---
name: ae-dropdown
description: Use when creating or configuring an AEGov dropdown menu with aegov-dls-angular directives.
---

# ae-dropdown

Import:
`DropdownDirective`, `DropdownTriggerDirective`, `DropdownItem`, `DropdownGroup`, `DropdownPlacement`, `DropdownTrigger` from `aegov-dls-angular`

Selectors:
`button[aeDropdown], a[aeDropdown], [aeDropdown]` (Data-driven menu)
`[aeDropdownTrigger]` (Custom template / markup trigger)

Inputs (DropdownDirective):
items: DropdownItem[] = [] # [{ label: string, value?: string, href?: string, icon?: IconName, disabled?: boolean, badge?: string, description?: string, onClick?: (item, event) => void }]
groups: DropdownGroup[] = [] # [{ label?: string, header?: string, items: DropdownItem[] }]
dropdownPlacement: 'bottom' | 'top' | 'left' | 'right' = 'bottom' # auto-positions on screen to prevent overflow
dropdownTrigger: 'click' | 'hover' = 'click'
offset: number = 6
widthClass: string = 'w-52'
menuClassName: string = ''
disabled: boolean = false
closeOnSelect: boolean = true

Inputs (DropdownTriggerDirective):
aeDropdownTrigger: HTMLElement | ElementRef<HTMLElement> | string # #templateRef or element ID
dropdownPlacement: 'bottom' | 'top' | 'left' | 'right' = 'bottom'
dropdownTrigger: 'click' | 'hover' = 'click'
offset: number = 6
disabled: boolean = false
closeOnSelect: boolean = true

Outputs:
select: OutputEmitterRef<DropdownItem> # DropdownDirective only
openChange: OutputEmitterRef<boolean>

Methods:
toggle(): void
open(): void
close(): void

Examples:

Data-driven:
```html
<button aeButton aeDropdown [items]="menuItems" (select)="onSelect($event)">
  Actions
  <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
</button>
```

Custom template trigger:
```html
<button aeButton [aeDropdownTrigger]="userMenu">
  Account
  <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
</button>
<div #userMenu class="aegov-dropdown hidden w-72">
  <div class="dropdown-header">Signed in as user@example.com</div>
  <div class="dropdown-body p-2" data-dropdown-prevent-close>
    <!-- custom content -->
  </div>
</div>
```
