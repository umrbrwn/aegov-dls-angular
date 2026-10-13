---
name: using-navigation-directives
description: Use when customizing AEGov header navigation slots, brand logo, action buttons, navbar actions, and mobile drawer content using structural directives.
---

# using-navigation-directives

Import:
`NavigationComponent`, `NavBrandDirective`, `NavPrimaryActionsDirective`, `NavSecondaryActionsDirective`, `NavDrawerContentDirective`, `ButtonDirective`, `IconDirective`, `DropdownDirective`, `NavTarget` from `aegov-dls-angular`

Related skill:
`components/ae-navigation`

### Structural Directives

- `*aeNavBrand` (or `ng-template aeNavBrand`) — Brand logo & entity name in desktop, mobile, and drawer header.
- `*aeNavPrimaryActions` (or `ng-template aeNavPrimaryActions`) — Top-bar primary actions (renders in desktop top-right and mobile header top-right automatically).
- `*aeNavSecondaryActions` (or `ng-template aeNavSecondaryActions`) — Action slot for main navigation bar on desktop & mobile drawer menu bottom (e.g. User Profile Dropdown, Switch Language, CTA button).
- `*aeNavDrawerContent` (or `ng-template aeNavDrawerContent`) — Custom content/widgets projected into the body of the mobile slide-out drawer.

### Optional Viewport Targeting
Each directive accepts an optional target (`'all' | 'desktop' | 'mobile' | 'drawer'`), defaulting to `'all'`:
```html
<ng-template aeNavPrimaryActions="desktop"> ... </ng-template>
<ng-template aeNavPrimaryActions="mobile"> ... </ng-template>
```

### Example

```html
<ae-navigation [items]="navItems">
  <!-- Brand Slot (automatic desktop, mobile, & drawer) -->
  <ng-template aeNavBrand>
    <a routerLink="/" class="flex items-center gap-3">
      <img src="/assets/uae-logo.svg" alt="UAE Logo" class="h-10" />
      <span class="font-bold text-lg text-primary-700">Digital UAE</span>
    </a>
  </ng-template>

  <!-- Desktop Top-Bar Action Buttons -->
  <ng-template aeNavPrimaryActions="desktop">
    <button aeButton variant="outline" size="sm">
      <svg aeIcon name="user" [size]="16"></svg>
      <span>Sign In</span>
    </button>
  </ng-template>

  <!-- Mobile Top-Bar Action -->
  <ng-template aeNavPrimaryActions="mobile">
    <button aeButton [isIcon]="true" aria-label="Search">
      <svg aeIcon name="magnifying-glass" [size]="18"></svg>
    </button>
  </ng-template>

  <!-- Main Navbar Actions: User Account Dropdown (Desktop navbar & mobile drawer) -->
  <ng-template aeNavSecondaryActions>
    <ae-dropdown [items]="userMenuItems" align="end" [hasCustomTrigger]="true">
      <button slot="trigger" class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-aeblack-100">
        <svg aeIcon name="user" [size]="20"></svg>
        <span class="text-sm font-medium">My Account</span>
        <svg aeIcon name="caret-down" [size]="14"></svg>
      </button>
    </ae-dropdown>
  </ng-template>

  <!-- Mobile Drawer Custom Footer/Content -->
  <ng-template aeNavDrawerContent>
    <div class="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
      <p class="font-medium">Need Assistance?</p>
      <p class="text-gray-500">Contact TDRA helpline: 171</p>
    </div>
  </ng-template>
</ae-navigation>
```
