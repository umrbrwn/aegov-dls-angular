import {
  Component,
  input,
  output,
  linkedSignal,
  computed,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconDirective, type IconName } from '../Icon/icon.directive';

export type PopoverTrigger = 'click' | 'hover';
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'ae-popover',
  exportAs: 'aePopover',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-block"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <!-- Trigger Area -->
      <div
        [id]="triggerId()"
        (click)="onTriggerClick($event)"
        class="inline-block"
        [attr.aria-describedby]="computedId()"
      >
        <ng-content select="[trigger], [slot=trigger], [popover-trigger]"></ng-content>

        @if (!hasCustomTrigger()) {
          <button
            type="button"
            class="aegov-btn"
            [class.btn-outline]="triggerVariant() === 'outline'"
            [class.btn-soft]="triggerVariant() === 'soft'"
            [class.btn-link]="triggerVariant() === 'link'"
            [class.btn-secondary]="triggerColor() === 'secondary'"
            [disabled]="disabled()"
          >
            {{ triggerText() }}
          </button>
        }
      </div>

      <!-- Popover Floating Panel -->
      @if (isVisible()) {
        <div
          data-popover
          [id]="computedId()"
          role="tooltip"
          [class]="popoverClasses()"
          tabindex="-1"
          (click)="$event.stopPropagation()"
        >
          <!-- Optional Close Button -->
          @if (showCloseButton()) {
            <button
              type="button"
              (click)="closePopover()"
              class="absolute top-2 end-2 p-1 text-aeblack-400 hover:text-aeblack-700 rounded-md transition-colors focus:outline-hidden"
              aria-label="Close popover"
            >
              <svg aeIcon name="x" [size]="16"></svg>
            </button>
          }

          <!-- Popover Header -->
          <ng-content select="[popover-header], [header], [slot=header]"></ng-content>

          @if (title()) {
            <div class="popover-header bg-aeblack-50 px-3 py-2 border-b border-aeblack-50 rounded-t-lg">
              <div class="font-semibold text-aeblack-900">{{ title() }}</div>
            </div>
          }

          <!-- Popover Body -->
          <div class="popover-body px-3 py-2 text-aeblack-600 rounded-b-lg">
            <ng-content select="[popover-body], [content], [slot=content]"></ng-content>

            @if (description()) {
              <p class="mb-0 text-sm leading-relaxed">{{ description() }}</p>
            }

            <!-- Default Fallback Content -->
            @if (!title() && !description()) {
              <ng-content></ng-content>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class PopoverComponent {
  /**
   * Unique HTML ID for popover (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Popover header title text
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Popover body description text
   */
  readonly description = input<string | undefined>(undefined);

  /**
   * Text for default trigger button
   */
  readonly triggerText = input<string>('Default popover');

  /**
   * Default button variant: 'solid' | 'outline' | 'soft' | 'link'
   */
  readonly triggerVariant = input<'solid' | 'outline' | 'soft' | 'link'>('solid');

  /**
   * Default button color: 'primary' | 'secondary'
   */
  readonly triggerColor = input<'primary' | 'secondary'>('primary');

  /**
   * Trigger activation mode: 'click' | 'hover'
   */
  readonly trigger = input<PopoverTrigger>('click');

  /**
   * Placement side: 'top' | 'right' | 'bottom' | 'left'
   */
  readonly side = input<PopoverSide>('bottom');

  /**
   * Alignment along the side: 'start' | 'center' | 'end'
   */
  readonly align = input<PopoverAlign>('center');

  /**
   * Width utility class (default 'w-64')
   */
  readonly widthClass = input<string>('w-64');

  /**
   * Whether to show an 'X' close button inside popover
   */
  readonly showCloseButton = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether clicking outside dismisses the popover
   */
  readonly closeOnOutsideClick = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Whether Escape key dismisses the popover
   */
  readonly closeOnEscape = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Controlled open state
   */
  readonly isOpen = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether custom trigger element is projected
   */
  readonly hasCustomTrigger = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Disabled state
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when open state changes
   */
  readonly openChange = output<boolean>();
  readonly open = output<void>();
  readonly close = output<void>();

  private readonly internalOpen = linkedSignal(() => !!this.isOpen());
  private hoverTimeout: any = null;

  private readonly uniqueId = `popover-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);
  protected readonly triggerId = computed(() => `${this.computedId()}-trigger`);

  protected readonly isVisible = computed(() => this.internalOpen());

  private readonly effectiveTrigger = computed<PopoverTrigger>(() => this.trigger() || 'click');
  private readonly effectiveSide = computed<PopoverSide>(() => this.side() || 'bottom');
  private readonly effectiveAlign = computed<PopoverAlign>(() => this.align() || 'center');

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isVisible() || !this.closeOnOutsideClick()) return;
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closePopover();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isVisible() && this.closeOnEscape() && event.key === 'Escape') {
      event.preventDefault();
      this.closePopover();
    }
  }

  protected readonly popoverClasses = computed<string>(() => {
    const s = this.effectiveSide();
    const a = this.effectiveAlign();

    let sideClass = '';
    let alignClass = '';

    if (s === 'bottom') {
      sideClass = 'top-full mt-2';
      alignClass =
        a === 'center'
          ? 'left-1/2 -translate-x-1/2'
          : a === 'end'
          ? 'right-0 rtl:left-0 rtl:right-auto'
          : 'left-0 rtl:right-0 rtl:left-auto';
    } else if (s === 'top') {
      sideClass = 'bottom-full mb-2';
      alignClass =
        a === 'center'
          ? 'left-1/2 -translate-x-1/2'
          : a === 'end'
          ? 'right-0 rtl:left-0 rtl:right-auto'
          : 'left-0 rtl:right-0 rtl:left-auto';
    } else if (s === 'left') {
      sideClass = 'right-full mr-2';
      alignClass =
        a === 'center' ? 'top-1/2 -translate-y-1/2' : a === 'end' ? 'bottom-0' : 'top-0';
    } else if (s === 'right') {
      sideClass = 'left-full ml-2';
      alignClass =
        a === 'center' ? 'top-1/2 -translate-y-1/2' : a === 'end' ? 'bottom-0' : 'top-0';
    }

    return cn(
      'aegov-popover !visible !opacity-100 absolute z-50 rounded-lg shadow-xl bg-whitely-50 border border-aeblack-100/60',
      this.widthClass(),
      sideClass,
      alignClass,
      this.className()
    );
  });

  protected onTriggerClick(event: MouseEvent): void {
    if (this.disabled()) return;
    if (this.effectiveTrigger() === 'click') {
      const next = !this.internalOpen();
      this.internalOpen.set(next);
      this.openChange.emit(next);
      if (next) this.open.emit();
      else this.close.emit();
    }
  }

  protected onMouseEnter(): void {
    if (this.disabled()) return;
    if (this.effectiveTrigger() === 'hover') {
      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
      this.internalOpen.set(true);
      this.openChange.emit(true);
      this.open.emit();
    }
  }

  protected onMouseLeave(): void {
    if (this.effectiveTrigger() === 'hover') {
      this.hoverTimeout = setTimeout(() => {
        this.internalOpen.set(false);
        this.openChange.emit(false);
        this.close.emit();
      }, 150);
    }
  }

  openPopover(): void {
    if (this.disabled()) return;
    this.internalOpen.set(true);
    this.openChange.emit(true);
    this.open.emit();
  }

  closePopover(): void {
    this.internalOpen.set(false);
    this.openChange.emit(false);
    this.close.emit();
  }

  toggle(): void {
    if (this.isVisible()) this.closePopover();
    else this.openPopover();
  }
}
