---
name: ae-navigation
description: Use when creating or configuring the AEGov navigation bar with aegov-dls-angular.
---

# ae-navigation

Import:
`NavigationComponent`, `NavBrandDirective`, `NavPrimaryActionsDirective`, `NavSecondaryActionsDirective`, `NavDrawerContentDirective`, `HyperlinkDirective`, `IconDirective`, `DropdownDirective`, `NavItemData`, `NavDropdownGroup`, `NavDropdownItem`, `NavTarget` from `aegov-dls-angular`

Selector: `ae-navigation`

Structural Directives:
`*aeNavBrand` — Brand logo/name template (supports optional target: `"all"` | `"desktop"` | `"mobile"` | `"drawer"`)
`*aeNavPrimaryActions` — Top-bar primary actions (supports optional target: `"all"` | `"desktop"` | `"mobile"` | `"drawer"`)
`*aeNavSecondaryActions` — Main navigation bar actions on desktop & mobile drawer menu bottom (supports optional target: `"all"` | `"desktop"` | `"mobile"` | `"drawer"`)
`*aeNavDrawerContent` — Mobile drawer custom body content

Inputs:
items: NavItemData[]

Outputs:
itemClick: OutputEmitterRef<NavItemData>
subItemClick: OutputEmitterRef<NavDropdownItem>
mobileDrawerChange: OutputEmitterRef<boolean>

Methods:
toggleMobileDrawer(): void
openMobileDrawer(): void
closeMobileDrawer(): void

Related:
`using-navigation-directives`

Example:
```html
<ae-navigation [items]="navItems">
  <ng-template aeNavBrand>
    <a routerLink="/"><img src="/assets/logo.svg" alt="UAE Government" class="h-10" /></a>
  </ng-template>

  <!-- Top bar primary action (desktop & mobile) -->
  <ng-template aeNavPrimaryActions>
    <a aeHyperlink href="#">عربي</a>
  </ng-template>

  <!-- Secondary Action slot with User Dropdown (desktop navbar & mobile drawer) -->
  <ng-template aeNavSecondaryActions>
    <div class="flex items-center gap-2">
      <button aeDropdown [items]="userMenuItems" class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-aeblack-100">
        <svg aeIcon name="user" [size]="20"></svg>
        <span class="text-sm font-medium">My Account</span>
        <svg aeIcon name="caret-down" [size]="14"></svg>
      </button>
    </div>
  </ng-template>
</ae-navigation>
```
