import {
  Component,
  Directive,
  Input,
  TemplateRef,
  computed,
  contentChild,
  contentChildren,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconDirective, type IconName } from '../Icon/icon.directive';

export type NavTarget = 'all' | 'desktop' | 'mobile' | 'drawer';

function normalizeTarget(val: unknown): NavTarget {
  if (!val || val === '' || val === 'all') {
    return 'all';
  }
  return val as NavTarget;
}

export interface NavDropdownItem {
  label: string;
  url?: string | any[];
  navigation?: 'router' | 'href';
  target?: string;
  onClick?: (event: MouseEvent) => void;
}

export interface NavDropdownGroup {
  title?: string;
  items: NavDropdownItem[];
}

export interface NavItemData {
  label: string;
  url?: string | any[];
  navigation?: 'router' | 'href';
  icon?: IconName;
  dropdown?: NavDropdownGroup[];
  dropdownColumns?: number;
  dropdownVariant?: 'standard' | 'multi-column' | 'mega';
  target?: string;
  onClick?: (event: MouseEvent) => void;
}

/** Structural directive for projecting custom brand logo/content in desktop, mobile, or drawer headers */
@Directive({
  selector: '[aeNavBrand]',
  standalone: true,
})
export class NavBrandDirective {
  private _target: NavTarget = 'all';

  @Input('aeNavBrand')
  set target(value: NavTarget | '' | undefined | null) {
    this._target = normalizeTarget(value);
  }
  get target(): NavTarget {
    return this._target;
  }

  constructor(public readonly template: TemplateRef<unknown>) {}
}

/** Structural directive for projecting custom primary action buttons in the top bar (desktop & mobile) */
@Directive({
  selector: '[aeNavPrimaryActions]',
  standalone: true,
})
export class NavPrimaryActionsDirective {
  private _target: NavTarget = 'all';

  @Input('aeNavPrimaryActions')
  set target(value: NavTarget | '' | undefined | null) {
    this._target = normalizeTarget(value);
  }
  get target(): NavTarget {
    return this._target;
  }

  constructor(public readonly template: TemplateRef<unknown>) {}
}

/** Structural directive for projecting custom secondary action buttons/dropdowns (desktop navbar & mobile drawer) */
@Directive({
  selector: '[aeNavSecondaryActions]',
  standalone: true,
})
export class NavSecondaryActionsDirective {
  private _target: NavTarget = 'all';

  @Input('aeNavSecondaryActions')
  set target(value: NavTarget | '' | undefined | null) {
    this._target = normalizeTarget(value);
  }
  get target(): NavTarget {
    return this._target;
  }

  constructor(public readonly template: TemplateRef<unknown>) {}
}

/** Structural directive for projecting custom body content in the mobile slide-out drawer */
@Directive({
  selector: '[aeNavDrawerContent]',
  standalone: true,
})
export class NavDrawerContentDirective {
  constructor(public readonly template: TemplateRef<unknown>) {}
}

@Component({
  selector: 'ae-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    class: 'block w-full',
  },
  template: `
    <header class="w-full" [class.aegov-header]="hasHeaderSlots()">

      <!-- ========================================== -->
      <!-- DESKTOP HEADER TOP BAR                     -->
      <!-- ========================================== -->
      @if (desktopBrand() || desktopPrimaryActions()) {
        <div class="header-desktop max-lg:hidden">
          <div class="header-top py-3">
            <div class="container mx-auto">
              <div class="lg:flex lg:items-center lg:justify-between">

                <div class="header-logo logos">
                  @if (desktopBrand()) {
                    <ng-container *ngTemplateOutlet="desktopBrand()!.template" />
                  }
                </div>

                <div class="header-top-right flex flex-wrap items-center">
                  @if (desktopPrimaryActions()) {
                    <ng-container *ngTemplateOutlet="desktopPrimaryActions()!.template" />
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      }

      <!-- ========================================== -->
      <!-- MOBILE HEADER TOP BAR                      -->
      <!-- ========================================== -->
      @if (mobileBrand() || mobilePrimaryActions() || items().length > 0) {
        <div class="header-mobile lg:hidden">
          <div class="header-top py-2">
            <div class="container mx-auto max-sm:px-4">
              <div class="max-lg:flex max-lg:items-center justify-between">

                <div class="header-logo logos">
                  @if (mobileBrand()) {
                    <ng-container *ngTemplateOutlet="mobileBrand()!.template" />
                  }
                </div>

                <div class="header-top-right">
                  <div>
                    <div class="flex items-center gap-3">
                      @if (mobilePrimaryActions()) {
                        <ng-container *ngTemplateOutlet="mobilePrimaryActions()!.template" />
                      }
                      <button
                        type="button"
                        (click)="toggleMobileDrawer()"
                        class="hamburger-icon text-aeblack-700"
                        aria-label="Toggle main menu"
                      >
                        <svg aeIcon name="list" [size]="28"></svg>
                        <span class="sr-only">Toggle main menu</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }

      <!-- ========================================== -->
      <!-- MOBILE DRAWER MODAL                        -->
      <!-- ========================================== -->
      <div
        [class.hidden]="!isMobileDrawerOpen()"
        class="responsive-menu transform-none! [&_.main-navigation_.menu-item.active-page_a]:border-none [&_.accordion-active_svg]:rotate-180 max-lg:py-4 lg:hidden max-lg:bg-whitely-50 max-lg:fixed max-lg:inset-0 max-lg:w-full max-lg:[&_li_a]:w-full max-lg:[&_li_a]:py-2 max-lg:[&_.submenu-btn]:absolute! max-lg:[&_.submenu-btn]:end-0 max-lg:[&_.submenu-btn]:top-2 max-lg:[&_.submenu-btn]:w-6 max-lg:z-50 max-lg:flex-wrap max-lg:items-start max-lg:justify-start"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div class="w-full">
          <div class="w-full max-lg:px-4 flex items-center justify-between gap-4 mb-4">
            <div class="header-logo logos">
              @if (drawerBrand()) {
                <ng-container *ngTemplateOutlet="drawerBrand()!.template" />
              }
            </div>

            <div class="flex items-center gap-4">
              @if (drawerHeaderActions()) {
                <ng-container *ngTemplateOutlet="drawerHeaderActions()!.template" />
              }
              <button
                type="button"
                (click)="closeMobileDrawer()"
                class="text-aeblack-700"
                aria-label="Close main menu"
              >
                <svg aeIcon name="x" [size]="24" class="w-6"></svg>
                <span class="sr-only">Close main menu</span>
              </button>
            </div>
          </div>

          <div class="max-lg:max-h-[calc(100vh-6.375rem)] max-lg:px-4 max-lg:overflow-auto">
            @if (drawerContent()) {
              <ng-container *ngTemplateOutlet="drawerContent()!.template" />
            }

            <!-- Mobile Main Navigation Accordion -->
            @if (items().length > 0) {
              <nav class="main-navigation mb-4" aria-label="Main navigation">
                <div class="menu-main-menu-container">
                  <ul class="menu nav-menu">
                    @for (item of items(); track item.label; let i = $index) {
                      <li
                        class="menu-item relative"
                        [class.has-link-icon]="!!item.icon"
                        [class.menu-item-has-children]="item.dropdown && item.dropdown.length > 0"
                        routerLinkActive="active-page"
                        [routerLinkActiveOptions]="{ exact: !item.dropdown || item.dropdown.length === 0 }"
                      >
                        @if (isRouterNavigation(item)) {
                          <a
                            [routerLink]="item.url"
                            routerLinkActive="active-page"
                            [routerLinkActiveOptions]="{ exact: true }"
                            [target]="item.target || '_self'"
                            (click)="onItemClick(item, $event)"
                          >
                            @if (item.icon) {
                              <svg aeIcon [name]="item.icon" [size]="18" class="text-inherit me-1"></svg>
                            }
                            <span>{{ item.label }}</span>
                          </a>
                        } @else {
                          <a
                            [href]="item.url || '#'"
                            [target]="item.target || '_self'"
                            (click)="onItemClick(item, $event)"
                          >
                            @if (item.icon) {
                              <svg aeIcon [name]="item.icon" [size]="18" class="text-inherit me-1"></svg>
                            }
                            <span>{{ item.label }}</span>
                          </a>
                        }

                        @if (item.dropdown && item.dropdown.length > 0) {
                          <button
                            type="button"
                            class="submenu-btn shrink-0"
                            [class.accordion-active]="openMobileSubmenuIndex() === i"
                            (click)="toggleMobileSubmenu(i)"
                          >
                            <span><span class="sr-only">show submenu for "{{ item.label }}"</span></span>
                            <svg aeIcon name="caret-down" [size]="16"></svg>
                          </button>

                          <div
                            class="submenu z-10 bg-transparent"
                            [class.hidden]="openMobileSubmenuIndex() !== i"
                          >
                            <div class="[&>div]:p-3 [&_ul]:space-y-1.5">
                              @for (group of item.dropdown; track group.title || $index) {
                                <div>
                                  @if (group.title) {
                                    <h2 class="submenu-title max-lg:text-sm">{{ group.title }}</h2>
                                  }
                                  <ul>
                                    @for (subItem of group.items; track subItem.label) {
                                      @if (isRouterNavigation(subItem)) {
                                        <li class="menu-item" routerLinkActive="active-page" [routerLinkActiveOptions]="{ exact: true }">
                                          <a
                                            [routerLink]="subItem.url"
                                            [target]="subItem.target || '_self'"
                                            (click)="onSubItemClick(subItem, $event)"
                                          >{{ subItem.label }}</a>
                                        </li>
                                      } @else {
                                        <li class="menu-item">
                                          <a
                                            [href]="subItem.url || '#'"
                                            [target]="subItem.target || '_self'"
                                            (click)="onSubItemClick(subItem, $event)"
                                          >{{ subItem.label }}</a>
                                        </li>
                                      }
                                    }
                                  </ul>
                                </div>
                              }
                            </div>
                          </div>
                        }
                      </li>
                    }
                  </ul>
                </div>
              </nav>
            }

            <!-- Mobile Secondary / Navbar Actions (at bottom of drawer menu) -->
            @if (mobileSecondaryActions()) {
              <div class="drawer-secondary-actions pt-3 mt-2 border-t border-aeblack-100 flex flex-col gap-2">
                <ng-container *ngTemplateOutlet="mobileSecondaryActions()!.template" />
              </div>
            }
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- DESKTOP NAVIGATION BAR (Large Screens)     -->
      <!-- ========================================== -->
      <div class="header-navs max-lg:hidden relative">
        <div class="container mx-auto">
          <div class="flex content-between flex-wrap lg:flex-nowrap lg:justify-between lg:items-center">
            <!-- Left Main Navigation -->
            <nav class="main-navigation" aria-label="Main navigation">
              <div class="menu-main-menu-container">
                <ul class="menu nav-menu lg:flex lg:items-center lg:gap-1 xl:gap-2">
                  @for (item of items(); track item.label; let i = $index) {
                    <li
                      class="menu-item lg:inline-flex lg:items-center"
                      [class.has-link-icon]="!!item.icon"
                      [class.relative]="item.dropdown && item.dropdown.length > 0 && item.dropdownVariant !== 'mega' && (item.dropdownColumns || 1) < 4"
                      [class.menu-item-has-children]="item.dropdown && item.dropdown.length > 0"
                      [class.group]="item.dropdown && item.dropdown.length > 0"
                      routerLinkActive="active-page"
                      [routerLinkActiveOptions]="{ exact: !item.dropdown || item.dropdown.length === 0 }"
                      (mouseenter)="onDesktopItemMouseEnter(i)"
                      (mouseleave)="onDesktopItemMouseLeave(i)"
                    >
                      @if (isRouterNavigation(item)) {
                        <a
                          [routerLink]="item.url"
                          routerLinkActive="active-page"
                          [routerLinkActiveOptions]="{ exact: true }"
                          [target]="item.target || '_self'"
                          (click)="onItemClick(item, $event)"
                          class="hover:text-primary-800! hover:border-primary-800! group-hover:text-primary-800! group-hover:border-primary-800!"
                        >
                          @if (item.icon) {
                            <svg aeIcon [name]="item.icon" [size]="18" class="text-inherit me-1"></svg>
                          }
                          <span>{{ item.label }}</span>
                        </a>
                      } @else {
                        <a
                          [href]="item.url || '#'"
                          [target]="item.target || '_self'"
                          (click)="onItemClick(item, $event)"
                          class="hover:text-primary-800! hover:border-primary-800! group-hover:text-primary-800! group-hover:border-primary-800!"
                        >
                          @if (item.icon) {
                            <svg aeIcon [name]="item.icon" [size]="18" class="text-inherit me-1"></svg>
                          }
                          <span>{{ item.label }}</span>
                        </a>
                      }

                      @if (item.dropdown && item.dropdown.length > 0) {
                        <button
                          type="button"
                          class="submenu-btn shrink-0 group-hover:text-primary-800!"
                          [attr.aria-expanded]="openDesktopIndex() === i"
                          (click)="toggleDesktopSubmenu(i, $event)"
                        >
                          <span><span class="sr-only">show submenu for "{{ item.label }}"</span></span>
                          <svg aeIcon name="caret-down" [size]="16"></svg>
                        </button>

                        <!-- Mega Menu Variant (Full width container with 4-5 cols) -->
                        @if (item.dropdownVariant === 'mega' || (item.dropdownColumns && item.dropdownColumns >= 4) || item.dropdown.length >= 4) {
                          <div
                            class="submenu absolute z-50 lg:py-4 xl:py-5 2xl:py-6 inset-x-0 top-full transform-none xl:px-4 2xl:px-5 bg-whitely-50 shadow-lg border-t border-aeblack-100"
                            [class.hidden]="openDesktopIndex() !== i"
                          >
                            <div class="container mx-auto">
                              <div class="lg:grid lg:grid-cols-5 [&>div]:p-3">
                                @for (group of item.dropdown; track group.title || $index) {
                                  <div>
                                    @if (group.title) {
                                      <h2 class="submenu-title max-lg:text-sm">{{ group.title }}</h2>
                                    }
                                    <ul class="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                                      @for (subItem of group.items; track subItem.label) {
                                        @if (isRouterNavigation(subItem)) {
                                          <li class="menu-item" routerLinkActive="active-page" [routerLinkActiveOptions]="{ exact: true }">
                                            <a
                                              [routerLink]="subItem.url"
                                              [target]="subItem.target || '_self'"
                                              (click)="onSubItemClick(subItem, $event)"
                                            >{{ subItem.label }}</a>
                                          </li>
                                        } @else {
                                          <li class="menu-item">
                                            <a
                                              [href]="subItem.url || '#'"
                                              [target]="subItem.target || '_self'"
                                              (click)="onSubItemClick(subItem, $event)"
                                            >{{ subItem.label }}</a>
                                          </li>
                                        }
                                      }
                                    </ul>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        } @else {
                          <!-- Standard / Multi-Column Dropdown (Positioned absolute below the menu item) -->
                          <div
                            class="submenu absolute z-50 top-full start-0 lg:py-4 xl:py-5 2xl:py-6 rounded-bordered bg-whitely-50 shadow-lg min-w-max"
                            [class.hidden]="openDesktopIndex() !== i"
                          >
                            <div
                              class="[&>div]:p-3 lg:flex lg:flex-wrap"
                              [ngClass]="(item.dropdownVariant === 'multi-column' || (item.dropdown && item.dropdown.length > 1)) ? '[&>div]:w-52' : '[&>div]:w-72'"
                            >
                              @for (group of item.dropdown; track group.title || $index) {
                                <div>
                                  @if (group.title) {
                                    <h2 class="submenu-title max-lg:text-sm">{{ group.title }}</h2>
                                  }
                                  <ul class="space-y-1.5 xl:space-y-2 2xl:space-y-2.5">
                                    @for (subItem of group.items; track subItem.label) {
                                      @if (isRouterNavigation(subItem)) {
                                        <li class="menu-item" routerLinkActive="active-page" [routerLinkActiveOptions]="{ exact: true }">
                                          <a
                                            [routerLink]="subItem.url"
                                            [target]="subItem.target || '_self'"
                                            (click)="onSubItemClick(subItem, $event)"
                                          >{{ subItem.label }}</a>
                                        </li>
                                      } @else {
                                        <li class="menu-item">
                                          <a
                                            [href]="subItem.url || '#'"
                                            [target]="subItem.target || '_self'"
                                            (click)="onSubItemClick(subItem, $event)"
                                          >{{ subItem.label }}</a>
                                        </li>
                                      }
                                    }
                                  </ul>
                                </div>
                              }
                            </div>
                          </div>
                        }
                      }
                    </li>
                  }
                </ul>
              </div>
            </nav>

            <!-- Right Actions Slot (e.g. Dropdowns, User Profile, Language Switcher) -->
            @if (desktopSecondaryActions()) {
              <div class="header-navs-right flex items-center">
                <ng-container *ngTemplateOutlet="desktopSecondaryActions()!.template" />
              </div>
            }
          </div>
        </div>
      </div>

    </header>
  `,
})
export class NavigationComponent {
  // Directives for header slots
  readonly brandList = contentChildren(NavBrandDirective);
  readonly primaryActionsList = contentChildren(NavPrimaryActionsDirective);
  readonly secondaryActionsList = contentChildren(NavSecondaryActionsDirective);
  readonly drawerContent = contentChild(NavDrawerContentDirective);

  // Resolved slot templates
  protected readonly desktopBrand = computed(() => {
    const list = this.brandList();
    return list.find((b) => b.target === 'desktop') || list.find((b) => b.target === 'all');
  });

  protected readonly mobileBrand = computed(() => {
    const list = this.brandList();
    return list.find((b) => b.target === 'mobile') || list.find((b) => b.target === 'all');
  });

  protected readonly drawerBrand = computed(() => {
    const list = this.brandList();
    return (
      list.find((b) => b.target === 'drawer') ||
      list.find((b) => b.target === 'mobile') ||
      list.find((b) => b.target === 'all')
    );
  });

  protected readonly desktopPrimaryActions = computed(() => {
    const list = this.primaryActionsList();
    return list.find((a) => a.target === 'desktop') || list.find((a) => a.target === 'all');
  });

  protected readonly mobilePrimaryActions = computed(() => {
    const list = this.primaryActionsList();
    return list.find((a) => a.target === 'mobile') || list.find((a) => a.target === 'all');
  });

  protected readonly drawerHeaderActions = computed(() => {
    const list = this.primaryActionsList();
    return list.find((a) => a.target === 'drawer');
  });

  protected readonly desktopSecondaryActions = computed(() => {
    const list = this.secondaryActionsList();
    return list.find((a) => a.target === 'desktop') || list.find((a) => a.target === 'all');
  });

  protected readonly mobileSecondaryActions = computed(() => {
    const list = this.secondaryActionsList();
    return (
      list.find((a) => a.target === 'mobile' || a.target === 'drawer') ||
      list.find((a) => a.target === 'all')
    );
  });

  /**
   * Whether any header slots (brand, primary actions, custom drawer content) are present.
   * When false, component acts as a standalone navbar and omits the .aegov-header styling.
   */
  protected readonly hasHeaderSlots = computed(() =>
    Boolean(
      this.brandList().length > 0 ||
      this.primaryActionsList().length > 0 ||
      this.drawerContent()
    )
  );

  /**
   * Main navigation items list
   */
  readonly items = input<NavItemData[]>([]);

  /**
   * Emitted when a nav item is clicked
   */
  readonly itemClick = output<NavItemData>();

  /**
   * Emitted when a sub-item is clicked
   */
  readonly subItemClick = output<NavDropdownItem>();

  /**
   * Emitted when mobile drawer state changes
   */
  readonly mobileDrawerChange = output<boolean>();

  protected readonly openDesktopIndex = signal<number | null>(null);
  protected readonly openMobileSubmenuIndex = signal<number | null>(null);
  protected readonly isMobileDrawerOpen = signal<boolean>(false);

  private hoverTimeout: any = null;

  


  toggleMobileDrawer(): void {
    this.isMobileDrawerOpen.update((open) => {
      const next = !open;
      this.mobileDrawerChange.emit(next);
      return next;
    });
  }

  closeMobileDrawer(): void {
    if (this.isMobileDrawerOpen()) {
      this.isMobileDrawerOpen.set(false);
      this.mobileDrawerChange.emit(false);
    }
  }

  openMobileDrawer(): void {
    if (!this.isMobileDrawerOpen()) {
      this.isMobileDrawerOpen.set(true);
      this.mobileDrawerChange.emit(true);
    }
  }

  protected isRouterNavigation(item: { navigation?: 'router' | 'href' }): boolean {
    return item.navigation !== 'href';
  }

  protected onDesktopItemMouseEnter(index: number): void {
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
    this.openDesktopIndex.set(index);
  }

  protected onDesktopItemMouseLeave(_index: number): void {
    this.hoverTimeout = setTimeout(() => {
      this.openDesktopIndex.set(null);
    }, 150);
  }

  protected toggleDesktopSubmenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.openDesktopIndex.update(cur => (cur === index ? null : index));
  }

  protected toggleMobileSubmenu(index: number): void {
    this.openMobileSubmenuIndex.update(cur => (cur === index ? null : index));
  }

  protected onItemClick(item: NavItemData, event: MouseEvent): void {
    if (item.onClick) {
      item.onClick(event);
    }
    this.itemClick.emit(item);
  }

  protected onSubItemClick(subItem: NavDropdownItem, event: MouseEvent): void {
    if (subItem.onClick) {
      subItem.onClick(event);
    }
    this.subItemClick.emit(subItem);
    this.openDesktopIndex.set(null);
  }
}

