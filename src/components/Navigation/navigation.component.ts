import {
  Component,
  input,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cn } from '../../utils/cn';
import { IconComponent, type IconName } from '../Icon/icon.component';

export interface NavDropdownItem {
  label: string;
  href?: string;
  routerLink?: string | any[];
  target?: string;
}

export interface NavDropdownGroup {
  title: string;
  items: NavDropdownItem[];
}

export interface NavItemData {
  label: string;
  icon?: IconName;
  href?: string;
  routerLink?: string | any[];
  routerLinkActive?: string;
  routerLinkActiveOptions?: { exact: boolean };
  target?: string;
  dropdown?: NavDropdownGroup[];
  type?: 'primary' | 'secondary';
  tooltipText?: string;
  visible?: boolean;
}

export type NavBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const TOP_BAR_BREAKPOINTS: Record<string, string> = {
  sm: 'max-sm:hidden',
  md: 'max-md:hidden',
  lg: 'max-lg:hidden',
  xl: 'max-xl:hidden',
  '2xl': 'max-2xl:hidden',
};

const MOBILE_BREAKPOINTS: Record<string, string> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
  '2xl': '2xl:hidden',
};

@Component({
  selector: 'ae-nav-item',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (type() === 'secondary') {
      <li class="inline-flex items-center shrink-0 h-full">
        @if (routerLink()) {
          <a
            [routerLink]="routerLink()!"
            [routerLinkActive]="routerLinkActive()"
            [routerLinkActiveOptions]="routerLinkActiveOptions()"
            class="flex items-center justify-center shrink-0 h-14 px-3 focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-hidden text-primary-600 hover:text-primary-500 no-underline"
            [attr.title]="tooltipText() || label()"
          >
            @if (icon()) {
              <ae-icon [name]="icon()!" [size]="24"></ae-icon>
            }
            <span class="sr-only">{{ label() }}</span>
          </a>
        } @else {
          <a
            [href]="href() || '#'"
            [target]="target() || '_self'"
            class="flex items-center justify-center shrink-0 h-14 px-3 focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-hidden text-primary-600 hover:text-primary-500 no-underline"
            [attr.title]="tooltipText() || label()"
          >
            @if (icon()) {
              <ae-icon [name]="icon()!" [size]="24"></ae-icon>
            }
            <span class="sr-only">{{ label() }}</span>
          </a>
        }
      </li>
    } @else if (dropdown() && dropdown()!.length > 0) {
      <li
        class="relative group h-full flex items-stretch shrink-0"
        (mouseenter)="openDropdown()"
        (mouseleave)="closeDropdown()"
      >
        <button
          type="button"
          [class]="triggerClasses()"
          (click)="toggleOpen()"
          [attr.aria-expanded]="isOpen()"
        >
          @if (icon()) {
            <ae-icon [name]="icon()!" [size]="20"></ae-icon>
          }
          <span>{{ label() }}</span>
          <ae-icon
            name="caret-down"
            [size]="16"
            className="transition-transform duration-200"
            [class.rotate-180]="isOpen()"
          ></ae-icon>
        </button>

        @if (isOpen()) {
          <div
            class="absolute top-full start-0 z-50 min-w-[300px] max-w-[90vw]"
            (mouseenter)="openDropdown()"
            (mouseleave)="closeDropdown()"
          >
            <div class="rounded-lg border border-aeblack-100 bg-white p-5 shadow-xl flex flex-wrap gap-6 text-start">
              @for (group of dropdown()!; track group.title) {
                <div class="min-w-[180px] flex-1">
                  @if (group.title) {
                    <h3 class="mb-2 text-primary-700 font-bold text-sm">{{ group.title }}</h3>
                  }
                  <ul class="space-y-1.5 list-none p-0 m-0">
                    @for (item of group.items; track item.label) {
                      <li>
                        @if (item.routerLink) {
                          <a
                            [routerLink]="item.routerLink"
                            (click)="closeDropdown()"
                            class="block py-1 text-aeblack-800 hover:text-primary-700 hover:underline transition-colors text-sm no-underline text-start font-medium"
                          >
                            {{ item.label }}
                          </a>
                        } @else {
                          <a
                            [href]="item.href || '#'"
                            [target]="item.target || '_self'"
                            (click)="closeDropdown()"
                            class="block py-1 text-aeblack-800 hover:text-primary-700 hover:underline transition-colors text-sm no-underline text-start font-medium"
                          >
                            {{ item.label }}
                          </a>
                        }
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          </div>
        }
      </li>
    } @else {
      <li class="relative inline-flex items-stretch shrink-0 h-full">
        @if (routerLink()) {
          <a
            [routerLink]="routerLink()!"
            [routerLinkActive]="routerLinkActive()"
            [routerLinkActiveOptions]="routerLinkActiveOptions()"
            [class]="linkClasses()"
          >
            @if (icon()) {
              <ae-icon [name]="icon()!" [size]="20"></ae-icon>
            }
            <span>{{ label() }}</span>
          </a>
        } @else {
          <a
            [href]="href() || '#'"
            [target]="target() || '_self'"
            [class]="linkClasses()"
          >
            @if (icon()) {
              <ae-icon [name]="icon()!" [size]="20"></ae-icon>
            }
            <span>{{ label() }}</span>
          </a>
        }
      </li>
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-self: stretch;
      height: 100%;
    }
  `]
})
export class NavItemComponent {
  readonly label = input<string>('');
  readonly href = input<string | undefined>(undefined);
  readonly routerLink = input<string | any[] | undefined>(undefined);
  readonly routerLinkActive = input<string>('border-primary-900 text-primary-900 font-bold');
  readonly routerLinkActiveOptions = input<{ exact: boolean }>({ exact: false });
  readonly target = input<string | undefined>(undefined);
  readonly icon = input<IconName | undefined>(undefined);
  readonly isActive = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly dropdown = input<NavDropdownGroup[] | undefined>(undefined);
  readonly type = input<'primary' | 'secondary'>('primary');
  readonly tooltipText = input<string | undefined>(undefined);

  readonly isOpen = signal<boolean>(false);

  private readonly baseItemClasses =
    'inline-flex items-center gap-2 border-b-2 border-transparent px-2.5 xl:px-3.5 py-4 font-bold text-sm whitespace-nowrap shrink-0 h-full transition-colors no-underline -mb-px ' +
    'hover:border-primary-800 hover:text-primary-800 focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-hidden';

  readonly triggerClasses = computed(() =>
    cn(
      this.baseItemClasses,
      'bg-transparent cursor-pointer',
      (this.isActive() || this.isOpen()) && 'border-primary-900 text-primary-900 font-bold'
    )
  );

  readonly linkClasses = computed(() =>
    cn(
      this.baseItemClasses,
      this.isActive() && 'border-primary-900 text-primary-900 font-bold'
    )
  );

  openDropdown(): void {
    this.isOpen.set(true);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  toggleOpen(): void {
    this.isOpen.update(prev => !prev);
  }
}

@Component({
  selector: 'ae-main-menu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul [class]="menuClasses()">
      <ng-content></ng-content>
    </ul>
  `,
  styles: [`
    :host {
      display: flex;
      align-self: stretch;
      height: 100%;
    }
  `]
})
export class MainMenuComponent {
  readonly className = input<string>('');
  readonly menuClasses = computed(() => cn('flex items-stretch flex-nowrap gap-0.5 xl:gap-1.5 list-none m-0 p-0 h-full', this.className()));
}

@Component({
  selector: 'ae-secondary-menu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="menuClasses()">
      <ul class="flex items-center flex-nowrap gap-1 list-none m-0 p-0 h-full">
        <ng-content></ng-content>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-self: stretch;
      height: 100%;
    }
  `]
})
export class SecondaryMenuComponent {
  readonly className = input<string>('');
  readonly menuClasses = computed(() => cn('header-navs-right flex items-center shrink-0 ms-auto h-full', this.className()));
}

@Component({
  selector: 'ae-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, NavItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Desktop Top Bar Slot (For Branding Logos, Notifications, Search, etc.) -->
    <div [class]="topBarClasses()">
      <ng-content select="[top-bar], [slot=top-bar]"></ng-content>
    </div>

    <!-- Mobile Header Bar (Visible on mobile viewports) -->
    <div [class]="mobileHeaderClasses()">
      <div class="py-2.5 px-4 bg-white flex items-center justify-between border-b border-aeblack-100">
        <!-- Mobile Logo Slot -->
        <div class="flex items-center gap-3">
          <ng-content select="[logo], [slot=logo]"></ng-content>
        </div>

        <!-- Mobile Right Controls (Actions + Hamburger) -->
        <div class="flex items-center gap-2">
          <!-- Persistent Mobile Actions Slot (e.g. Notification Bell) -->
          <ng-content select="[mobile-actions], [slot=mobile-actions]"></ng-content>

          <!-- Mobile Menu Hamburger Button -->
          <button
            type="button"
            (click)="toggleMobileDrawer(true)"
            class="p-1.5 text-aeblack-800 hover:text-primary-700 cursor-pointer bg-transparent border-0 flex items-center justify-center"
            [attr.aria-label]="drawerToggleLabel()"
          >
            <ae-icon name="list" [size]="28"></ae-icon>
          </button>
        </div>
      </div>

      <!-- Full-Screen Responsive Mobile Menu Drawer -->
      @if (mobileOpen()) {
        <div class="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden animate-fadeIn">
          <!-- Drawer Top Header Bar -->
          <div class="p-4 flex items-center justify-between border-b border-aeblack-100 bg-aeblack-50">
            <div class="flex items-center">
              <ng-content select="[drawer-header], [slot=drawer-header]">
                <span class="font-bold text-primary-700 text-lg">{{ drawerTitle() }}</span>
              </ng-content>
            </div>
            <button
              type="button"
              (click)="toggleMobileDrawer(false)"
              class="p-2 text-aeblack-800 hover:text-red-600 bg-transparent border-0 cursor-pointer"
              [attr.aria-label]="drawerCloseLabel()"
            >
              <ae-icon name="x" [size]="24"></ae-icon>
            </button>
          </div>

          <!-- Drawer Scrollable Body (Navigation Links & Content) -->
          <div class="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
            <div>
              <!-- Auto-rendered Navigation Items (Data-Driven Mode) -->
              @if (items().length > 0) {
                <nav class="mb-6" aria-label="Mobile navigation">
                  <ul class="space-y-1 list-none m-0 p-0">
                    @for (item of items(); track item.label) {
                      @if (item.visible !== false) {
                        <li>
                          @if (item.dropdown && item.dropdown.length > 0) {
                            <div>
                              <button
                                type="button"
                                (click)="toggleMobileItem(item.label)"
                                class="flex items-center justify-between w-full px-3 py-2.5 text-base font-bold text-aeblack-800 hover:bg-aeblack-50 hover:text-primary-800 rounded-md transition-colors bg-transparent border-0 cursor-pointer text-start"
                              >
                                <div class="flex items-center gap-3">
                                  @if (item.icon) {
                                    <ae-icon [name]="item.icon" [size]="20" className="text-primary-700"></ae-icon>
                                  }
                                  <span>{{ item.label }}</span>
                                </div>
                                <ae-icon
                                  name="caret-down"
                                  [size]="16"
                                  className="text-aeblack-500 transition-transform duration-200"
                                  [class.rotate-180]="isMobileItemExpanded(item.label)"
                                ></ae-icon>
                              </button>
                              @if (isMobileItemExpanded(item.label)) {
                                <div class="ps-6 pe-2 py-1 space-y-3">
                                  @for (group of item.dropdown; track group.title) {
                                    <div>
                                      @if (group.title) {
                                        <p class="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1 mt-2">{{ group.title }}</p>
                                      }
                                      <ul class="space-y-1 list-none m-0 p-0">
                                        @for (subItem of group.items; track subItem.label) {
                                          <li>
                                            @if (subItem.routerLink) {
                                              <a
                                                [routerLink]="subItem.routerLink"
                                                (click)="toggleMobileDrawer(false)"
                                                class="block py-1 text-sm text-aeblack-700 hover:text-primary-700 hover:underline transition-colors no-underline text-start font-medium"
                                              >
                                                {{ subItem.label }}
                                              </a>
                                            } @else {
                                              <a
                                                [href]="subItem.href || '#'"
                                                [target]="subItem.target || '_self'"
                                                (click)="toggleMobileDrawer(false)"
                                                class="block py-1 text-sm text-aeblack-700 hover:text-primary-700 hover:underline transition-colors no-underline text-start font-medium"
                                              >
                                                {{ subItem.label }}
                                              </a>
                                            }
                                          </li>
                                        }
                                      </ul>
                                    </div>
                                  }
                                </div>
                              }
                            </div>
                          } @else if (item.routerLink) {
                            <a
                              [routerLink]="item.routerLink"
                              (click)="toggleMobileDrawer(false)"
                              class="flex items-center gap-3 px-3 py-2.5 text-base font-bold text-aeblack-800 hover:bg-aeblack-50 hover:text-primary-800 rounded-md transition-colors no-underline text-start"
                            >
                              @if (item.icon) {
                                <ae-icon [name]="item.icon" [size]="20" className="text-primary-700"></ae-icon>
                              }
                              <span>{{ item.label }}</span>
                            </a>
                          } @else {
                            <a
                              [href]="item.href || '#'"
                              [target]="item.target || '_self'"
                              (click)="toggleMobileDrawer(false)"
                              class="flex items-center gap-3 px-3 py-2.5 text-base font-bold text-aeblack-800 hover:bg-aeblack-50 hover:text-primary-800 rounded-md transition-colors no-underline text-start"
                            >
                              @if (item.icon) {
                                <ae-icon [name]="item.icon" [size]="20" className="text-primary-700"></ae-icon>
                              }
                              <span>{{ item.label }}</span>
                            </a>
                          }
                        </li>
                      }
                    }
                  </ul>
                </nav>
              }

              <!-- Content Slots for Custom Body Projection -->
              <ng-content select="[drawer-body], [slot=drawer-body]"></ng-content>
              <ng-content select="ae-main-menu, [main-menu]"></ng-content>
              <ng-content></ng-content>
            </div>

            <!-- Drawer Bottom Footer / Utilities Slot -->
            <div class="border-t border-aeblack-100 pt-4 mt-auto">
              <ng-content select="[drawer-footer], [slot=drawer-footer]"></ng-content>
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Desktop Navigation Bar (Visible on desktop viewports) -->
    <div [class]="desktopClasses()">
      <div class="bg-aeblack-50 border-b border-aeblack-100">
        <div [class]="containerClass()">
          <div class="w-full flex items-stretch justify-between gap-4">
            <!-- Auto-rendered Navigation Items (Data-Driven Mode) -->
            @if (items().length > 0) {
              <ul class="flex items-stretch flex-nowrap gap-0.5 xl:gap-1.5 list-none m-0 p-0 min-w-0 h-full">
                @for (item of items(); track item.label) {
                  @if (item.visible !== false) {
                    <ae-nav-item
                      [label]="item.label"
                      [icon]="item.icon"
                      [href]="item.href"
                      [routerLink]="item.routerLink"
                      [routerLinkActive]="item.routerLinkActive || 'border-primary-900 text-primary-900 font-bold'"
                      [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                      [target]="item.target"
                      [dropdown]="item.dropdown"
                      [type]="item.type || 'primary'"
                      [tooltipText]="item.tooltipText"
                    ></ae-nav-item>
                  }
                }
              </ul>
            }

            <!-- Slot Projection for Main Menu & Secondary Actions -->
            <ng-content select="ae-main-menu, [main-menu]"></ng-content>
            <ng-content select="ae-secondary-menu, [secondary-menu]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class NavigationComponent {
  readonly className = input<string>('');
  readonly containerClass = input<string>('container mx-auto px-4 sm:px-6 lg:px-8');
  readonly breakpoint = input<NavBreakpoint>('xl');
  readonly drawerTitle = input<string>('UAE Gov Menu');
  readonly drawerToggleLabel = input<string>('Toggle main menu');
  readonly drawerCloseLabel = input<string>('Close menu');
  readonly items = input<NavItemData[]>([]);

  readonly mobileOpen = signal<boolean>(false);
  readonly expandedMobileItems = signal<Set<string>>(new Set());

  readonly topBarClasses = computed(() =>
    cn(TOP_BAR_BREAKPOINTS[this.breakpoint()] ?? 'max-xl:hidden')
  );

  readonly mobileHeaderClasses = computed(() =>
    cn(MOBILE_BREAKPOINTS[this.breakpoint()] ?? 'xl:hidden')
  );

  readonly desktopClasses = computed(() =>
    cn(TOP_BAR_BREAKPOINTS[this.breakpoint()] ?? 'max-xl:hidden', this.className())
  );

  toggleMobileItem(label: string): void {
    this.expandedMobileItems.update(set => {
      const next = new Set(set);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  isMobileItemExpanded(label: string): boolean {
    return this.expandedMobileItems().has(label);
  }

  toggleMobileDrawer(open?: boolean): void {
    if (open !== undefined) {
      this.mobileOpen.set(open);
    } else {
      this.mobileOpen.update(prev => !prev);
    }
  }
}
