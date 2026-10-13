import {
  Directive,
  Component,
  input,
  output,
  signal,
  computed,
  inject,
  ElementRef,
  Renderer2,
  ViewContainerRef,
  ComponentRef,
  HostListener,
  booleanAttribute,
  OnDestroy,
  PLATFORM_ID,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconDirective, type IconName } from '../Icon/icon.directive';

import {
  cycleFocus,
  resolveMenuElement,
  shouldCloseOnMenuClick,
  applyDropdownPosition,
  type DropdownPlacement,
  type DropdownTrigger,
} from './dropdown.helpers';

export type { DropdownPlacement, DropdownTrigger };

export interface DropdownItem {
  label: string;
  value?: string;
  href?: string;
  icon?: IconName;
  disabled?: boolean;
  badge?: string;
  description?: string;
  onClick?: (item: DropdownItem, event: MouseEvent) => void;
}

export interface DropdownGroup {
  label?: string;
  header?: string;
  items: DropdownItem[];
}

/**
 * Abstract foundational controller for dropdown triggers.
 * Handles reactive open state, outside-click and escape dismissal, keyboard navigation,
 * and reliable viewport-anchored positioning with automatic collision and edge detection.
 */
@Directive()
export abstract class DropdownBaseDirective implements OnDestroy {
  protected readonly el = inject(ElementRef<HTMLElement>);
  protected readonly renderer = inject(Renderer2);
  protected readonly platformId = inject(PLATFORM_ID);

  /** Placement side relative to trigger: 'bottom' | 'top' | 'left' | 'right' */
  readonly dropdownPlacement = input<DropdownPlacement>('bottom');

  /** Activation trigger mode: 'click' | 'hover' */
  readonly dropdownTrigger = input<DropdownTrigger>('click');

  /** Whether the dropdown interaction is disabled */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /** Distance in pixels between trigger and dropdown panel */
  readonly offset = input<number>(6);

  /** Emitted whenever the open state toggles */
  readonly openChange = output<boolean>();

  readonly isOpen = signal<boolean>(false);
  readonly dropdownId = `ae-dropdown-${Math.random().toString(36).substring(2, 9)}`;

  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  private unlistenMenuMouseEnter: (() => void) | null = null;
  private unlistenMenuMouseLeave: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;

  protected abstract getMenuElement(): HTMLElement | null;
  protected abstract onMenuOpened(): void;
  protected abstract onMenuClosed(): void;

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.disabled() || this.isOpen() || !isPlatformBrowser(this.platformId)) return;

    this.cancelHoverTimeout();
    this.isOpen.set(true);
    this.openChange.emit(true);

    this.onMenuOpened();

    const menuEl = this.getMenuElement();
    if (menuEl) {
      this.reposition(menuEl);
      this.attachMenuHoverListeners(menuEl);
      this.attachPositionTracking(menuEl);
    }
  }

  close(): void {
    this.cancelHoverTimeout();
    this.detachMenuHoverListeners();
    this.detachPositionTracking();

    if (!this.isOpen() || !isPlatformBrowser(this.platformId)) return;

    this.isOpen.set(false);
    this.openChange.emit(false);

    this.onMenuClosed();
  }

  protected cancelHoverTimeout(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  protected scheduleHoverClose(): void {
    this.cancelHoverTimeout();
    this.hoverTimeout = setTimeout(() => {
      this.close();
    }, 150);
  }

  protected attachMenuHoverListeners(menuEl: HTMLElement): void {
    this.detachMenuHoverListeners();
    if (this.dropdownTrigger() === 'hover') {
      this.unlistenMenuMouseEnter = this.renderer.listen(menuEl, 'mouseenter', () => {
        this.cancelHoverTimeout();
      });
      this.unlistenMenuMouseLeave = this.renderer.listen(menuEl, 'mouseleave', () => {
        this.scheduleHoverClose();
      });
    }
  }

  protected detachMenuHoverListeners(): void {
    this.unlistenMenuMouseEnter?.();
    this.unlistenMenuMouseLeave?.();
    this.unlistenMenuMouseEnter = null;
    this.unlistenMenuMouseLeave = null;
  }

  protected attachPositionTracking(menuEl: HTMLElement): void {
    this.detachPositionTracking();

    // Re-check on next animation frame after browser completes layout & scrollbar updates
    requestAnimationFrame(() => {
      if (this.isOpen()) {
        this.reposition(menuEl);
      }
    });

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.isOpen()) {
          this.reposition(menuEl);
        }
      });
      this.resizeObserver.observe(this.el.nativeElement);
      if (menuEl.offsetParent) {
        this.resizeObserver.observe(menuEl.offsetParent);
      }
    }
  }

  protected detachPositionTracking(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Positions the menu anchored directly to the trigger.
   * Leverages the native offsetParent coordinate system when sharing the same container
   * for zero-offset pixel-perfect alignment across both Canvas and Storybook Docs views.
   */
  protected reposition(menuEl: HTMLElement): void {
    if (!isPlatformBrowser(this.platformId)) return;
    applyDropdownPosition(
      this.renderer,
      this.el.nativeElement,
      menuEl,
      this.dropdownPlacement(),
      this.offset()
    );
  }

  // --- Declarative Host & Document Event Handlers ---

  @HostListener('click', ['$event'])
  protected onHostClick(event: MouseEvent): void {
    if (this.disabled()) return;
    if (this.dropdownTrigger() === 'click') {
      this.toggle();
    }
  }

  @HostListener('mouseenter')
  protected onHostMouseEnter(): void {
    if (!this.disabled() && this.dropdownTrigger() === 'hover') {
      this.cancelHoverTimeout();
      this.open();
    }
  }

  @HostListener('mouseleave')
  protected onHostMouseLeave(): void {
    if (!this.disabled() && this.dropdownTrigger() === 'hover') {
      this.scheduleHoverClose();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const target = event.target as Node;
    const menuEl = this.getMenuElement();

    if (!this.el.nativeElement.contains(target) && (!menuEl || !menuEl.contains(target))) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isOpen()) {
      this.close();
      this.el.nativeElement.focus();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onWindowUpdate(): void {
    if (!this.isOpen()) return;
    const menuEl = this.getMenuElement();
    if (menuEl) {
      this.reposition(menuEl);
    }
  }

  @HostListener('keydown.arrowdown', ['$event'])
  protected onHostArrowDown(event: Event): void {
    if (this.disabled()) return;
    event.preventDefault();
    if (!this.isOpen()) {
      this.open();
    }
    const menuEl = this.getMenuElement();
    if (menuEl) {
      setTimeout(() => this.focusFirstItem(menuEl), 0);
    }
  }

  protected focusFirstItem(menuEl: HTMLElement): void {
    cycleFocus(menuEl, 1);
  }

  ngOnDestroy(): void {
    this.cancelHoverTimeout();
    this.detachMenuHoverListeners();
    this.close();
  }
}

/**
 * Universal Trigger Directive: Decorates any host element (button, icon, avatar, text)
 * and anchors a custom menu element or template directly to it.
 *
 * @example
 * ```html
 * <button aeButton [aeDropdownTrigger]="userMenu">My Account</button>
 * <div #userMenu class="aegov-dropdown hidden w-60">
 *   <div class="dropdown-header">john&#64;example.com</div>
 *   <div class="dropdown-body">...custom markup, checkboxes, links...</div>
 * </div>
 * ```
 */
@Directive({
  selector: '[aeDropdownTrigger]',
  exportAs: 'aeDropdownTrigger',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"true"',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-controls]': 'resolvedMenuId()',
  }
})
export class DropdownTriggerDirective extends DropdownBaseDirective {
  /** Reference to custom menu: HTMLElement, ElementRef, or HTML ID string */
  readonly aeDropdownTrigger = input<HTMLElement | ElementRef<HTMLElement> | string | undefined>(undefined);

  /** Whether selecting a menu item automatically closes the dropdown */
  readonly closeOnSelect = input<boolean, unknown>(true, { transform: booleanAttribute });

  private unlistenMenuClick: (() => void) | null = null;
  private unlistenMenuKeydown: (() => void) | null = null;

  protected readonly resolvedMenuId = computed<string | null>(() => {
    return this.getMenuElement()?.id || null;
  });

  protected override getMenuElement(): HTMLElement | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return resolveMenuElement(this.aeDropdownTrigger());
  }

  protected override onMenuOpened(): void {
    const menuEl = this.getMenuElement();
    if (!menuEl) return;

    // Handle clicks inside custom menu (close on link, ignore inputs/checkboxes)
    this.unlistenMenuClick = this.renderer.listen(menuEl, 'click', (event: MouseEvent) => {
      if (this.closeOnSelect() && shouldCloseOnMenuClick(event)) {
        this.close();
      }
    });

    // Arrow navigation inside menu
    this.unlistenMenuKeydown = this.renderer.listen(menuEl, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        cycleFocus(menuEl, event.key === 'ArrowDown' ? 1 : -1);
      }
    });
  }

  protected override onMenuClosed(): void {
    const menuEl = this.getMenuElement();
    if (menuEl) {
      this.renderer.addClass(menuEl, 'hidden');
      this.renderer.removeStyle(menuEl, 'display');
    }
    this.unlistenMenuClick?.();
    this.unlistenMenuKeydown?.();
    this.unlistenMenuClick = null;
    this.unlistenMenuKeydown = null;
  }
}

/**
 * Internal component dynamically rendered by `DropdownDirective` for data-driven menus.
 * Declared as a host-level `.aegov-dropdown` container.
 */
@Component({
  selector: 'div[aeDropdownMenuInternal]',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block !important;
      position: absolute !important;
      z-index: 50 !important;
    }
  `],
  host: {
    'role': 'menu',
    'tabindex': '-1',
    '[id]': 'id',
    '[class]': 'menuClasses()',
    '(click)': '$event.stopPropagation()',
    '(keydown)': 'onKeydown($event)',
  },
  template: `
    <div class="dropdown-body text-aeblack-600">
      @for (group of effectiveGroups(); track $index; let groupIdx = $index) {
        <ul
          class="py-1"
          [class.border-t]="groupIdx > 0"
          [class.border-aeblack-50]="groupIdx > 0"
          role="menu"
        >
          @if (group.label) {
            <li class="px-3 py-1.5 text-xs font-semibold text-aeblack-400 uppercase tracking-wider">
              {{ group.label }}
            </li>
          }
          @for (item of group.items; track item.value || item.label) {
            <li role="none">
              <a
                [href]="item.href || '#'"
                class="dropdown-item"
                [class.pointer-events-none]="item.disabled"
                [class.opacity-50]="item.disabled"
                role="menuitem"
                [attr.aria-disabled]="item.disabled ? 'true' : null"
                (click)="handleItemClick(item, $event)"
              >
                @if (item.icon) {
                  <svg aeIcon [name]="item.icon" [size]="20"></svg>
                }
                <span class="flex-1 text-left rtl:text-right">{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      }
    </div>
  `,
})
class DropdownMenuInternalComponent {
  private readonly el = inject(ElementRef<HTMLElement>);

  id = '';
  widthClass = signal('w-52');
  customClassName = signal('');
  groups = signal<DropdownGroup[]>([]);
  items = signal<DropdownItem[]>([]);

  readonly itemSelect = output<{ item: DropdownItem; event: MouseEvent }>();

  protected readonly effectiveGroups = computed<DropdownGroup[]>(() => {
    const grps = this.groups();
    if (grps && grps.length > 0) return grps;
    const itms = this.items();
    return itms && itms.length > 0 ? [{ items: itms }] : [];
  });

  protected readonly menuClasses = computed<string>(() => {
    return cn(
      'aegov-dropdown !block absolute z-50 overflow-hidden',
      this.widthClass(),
      this.customClassName()
    );
  });

  handleItemClick(item: DropdownItem, event: MouseEvent): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (!item.href || item.href === '#') {
      event.preventDefault();
    }
    item.onClick?.(item, event);
    this.itemSelect.emit({ item, event });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      cycleFocus(this.el.nativeElement, event.key === 'ArrowDown' ? 1 : -1);
    }
  }
}

/**
 * Turnkey Dropdown Directive: Decorates standard `<button>` or `<a>` elements and renders
 * a fully styled UAE Design System dropdown menu with zero wrapper DOM.
 *
 * @example
 * ```html
 * <button aeButton aeDropdown [items]="actionItems" (select)="onSelect($event)">
 *   Actions
 * </button>
 * ```
 */
@Directive({
  selector: 'button[aeDropdown], a[aeDropdown], [aeDropdown]',
  exportAs: 'aeDropdown',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"true"',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-controls]': 'dropdownId',
  }
})
export class DropdownDirective extends DropdownBaseDirective {
  private readonly vcr = inject(ViewContainerRef);

  /** Flat list of dropdown items (single group shorthand) */
  readonly items = input<DropdownItem[]>([]);

  /** Grouped dropdown items with optional section labels */
  readonly groups = input<DropdownGroup[]>([]);

  /** Width utility class for the dropdown menu panel (default 'w-52') */
  readonly widthClass = input<string>('w-52');

  /** Additional custom CSS classes for the menu container */
  readonly menuClassName = input<string>('');

  /** Whether selecting an item closes the menu */
  readonly closeOnSelect = input<boolean, unknown>(true, { transform: booleanAttribute });

  /** Emitted when a menu item is clicked */
  readonly select = output<DropdownItem>();

  private menuComponentRef: ComponentRef<DropdownMenuInternalComponent> | null = null;

  protected override getMenuElement(): HTMLElement | null {
    return (this.menuComponentRef?.location.nativeElement as HTMLElement) || null;
  }

  protected override onMenuOpened(): void {
    const compRef = this.vcr.createComponent(DropdownMenuInternalComponent);
    this.menuComponentRef = compRef;

    compRef.instance.id = this.dropdownId;
    compRef.instance.widthClass.set(this.widthClass());
    compRef.instance.customClassName.set(this.menuClassName());
    compRef.instance.items.set(this.items());
    compRef.instance.groups.set(this.groups());

    compRef.instance.itemSelect.subscribe(({ item }) => {
      this.select.emit(item);
      if (this.closeOnSelect()) {
        this.close();
        this.el.nativeElement.focus();
      }
    });

    compRef.changeDetectorRef.detectChanges();
  }

  protected override onMenuClosed(): void {
    if (this.menuComponentRef) {
      this.menuComponentRef.destroy();
      this.menuComponentRef = null;
    }
  }
}
