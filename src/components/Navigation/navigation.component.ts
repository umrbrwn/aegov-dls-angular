import {
  Component,
  input,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent, type IconName } from '../../icons/icon.component';

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavDropdownGroup {
  title: string;
  items: NavDropdownItem[];
}

@Component({
  selector: 'ae-nav-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (type() === 'secondary') {
      <li class="inline-flex">
        <a
          [href]="href() || '#'"
          class="flex items-center justify-center shrink-0 h-14 px-3 focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-hidden text-primary-600 hover:text-primary-500"
          [attr.title]="tooltipText() || label()"
        >
          @if (icon()) {
            <ae-icon [name]="icon()!" [size]="24"></ae-icon>
          }
          <span class="sr-only">{{ label() }}</span>
        </a>
      </li>
    } @else if (dropdown() && dropdown()!.length > 0) {
      <li class="relative group">
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
            class="transition-transform duration-200"
            [class.rotate-180]="isOpen()"
          ></ae-icon>
        </button>

        @if (isOpen()) {
          <div class="absolute top-full left-0 mt-2 z-50 min-w-[300px] rtl:right-0 rtl:left-auto">
            <div class="rounded-lg border border-aeblack-100 bg-whitely-50 p-4 shadow-lg flex flex-col rtl:text-right">
              @for (group of dropdown()!; track group.title) {
                <div class="mb-6 last:mb-0">
                  <h3 class="mb-2 text-primary-500 font-bold text-sm">{{ group.title }}</h3>
                  <ul class="space-y-1">
                    @for (item of group.items; track item.label) {
                      <li>
                        <a
                          [href]="item.href"
                          class="block px-2 py-1.5 text-aeblack-900 rounded-sm hover:bg-aeblack-50 hover:text-primary-700 transition-colors text-sm"
                        >
                          {{ item.label }}
                        </a>
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
      <li class="relative">
        <a
          [href]="href() || '#'"
          [class]="linkClasses()"
        >
          @if (icon()) {
            <ae-icon [name]="icon()!" [size]="20"></ae-icon>
          }
          <span>{{ label() }}</span>
        </a>
      </li>
    }
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class NavItemComponent {
  readonly label = input<string>('');
  readonly href = input<string | undefined>(undefined);
  readonly icon = input<IconName | undefined>(undefined);
  readonly isActive = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly dropdown = input<NavDropdownGroup[] | undefined>(undefined);
  readonly type = input<'primary' | 'secondary'>('primary');
  readonly tooltipText = input<string | undefined>(undefined);

  readonly isOpen = signal<boolean>(false);

  readonly triggerClasses = computed(() =>
    cn(
      'group inline-flex rtl:flex-row-reverse items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors cursor-pointer',
      'hover:border-primary-800 hover:text-primary-800',
      'focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-hidden',
      this.isActive() && 'border-primary-900 text-primary-900'
    )
  );

  readonly linkClasses = computed(() =>
    cn(
      'inline-flex rtl:flex-row-reverse items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors hover:border-primary-800 hover:text-primary-800',
      'focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-hidden',
      this.isActive() && 'border-primary-900 text-primary-900'
    )
  );

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
      display: block;
    }
  `]
})
export class MainMenuComponent {
  readonly class = input<string>('');
  readonly menuClasses = computed(() => cn('flex items-center gap-1 rtl:flex-row-reverse', this.class()));
}

@Component({
  selector: 'ae-secondary-menu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="menuClasses()">
      <ul class="flex items-center">
        <ng-content></ng-content>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SecondaryMenuComponent {
  readonly class = input<string>('');
  readonly menuClasses = computed(() => cn('header-navs-right', this.class()));
}

@Component({
  selector: 'ae-navigation',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile Navigation Drawer -->
    <div class="lg:hidden">
      <div class="py-2.5 px-4 bg-aeblack-50 flex items-center justify-between">
        <div class="font-bold text-primary-700 text-lg">
          <ng-content select="[logo], [slot=logo]"></ng-content>
        </div>
        <button
          type="button"
          (click)="toggleMobileDrawer()"
          class="p-2 text-aeblack-700 cursor-pointer"
          aria-label="Toggle navigation"
        >
          <ae-icon name="list" [size]="28"></ae-icon>
        </button>
      </div>

      @if (mobileOpen()) {
        <div class="fixed inset-0 z-50 bg-white overflow-auto flex flex-col">
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <span class="font-bold text-primary-700 text-lg">UAE Gov Menu</span>
            <button
              type="button"
              (click)="toggleMobileDrawer()"
              class="p-1 text-black cursor-pointer"
              aria-label="Close navigation"
            >
              <ae-icon name="x" [size]="28"></ae-icon>
            </button>
          </div>
          <div class="flex-1 p-4 overflow-y-auto">
            <ng-content></ng-content>
          </div>
        </div>
      }
    </div>

    <!-- Desktop Navigation Bar -->
    <div [class]="desktopClasses()">
      <div class="bg-aeblack-50 border-b border-gray-200">
        <div class="container mx-auto">
          <div class="flex items-center justify-between">
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
  readonly class = input<string>('');
  readonly mobileOpen = signal<boolean>(false);

  readonly desktopClasses = computed(() => cn('hidden lg:block', this.class()));

  toggleMobileDrawer(): void {
    this.mobileOpen.update(prev => !prev);
  }
}
