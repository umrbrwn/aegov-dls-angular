import {
  Component,
  input,
  output,
  linkedSignal,
  computed,
  effect,
  inject,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconDirective, type IconName } from '../Icon/icon.directive';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
export type ModalVariant = 'default' | 'serious';
export type ModalPlacement =
  | 'center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'ae-modal',
  exportAs: 'aeModal',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Optional Trigger Slot -->
    <div (click)="onTriggerClick()" class="inline-block">
      <ng-content select="[trigger], [slot=trigger], [modal-trigger]"></ng-content>
    </div>

    @if (isVisible()) {
      <!-- Backdrop -->
      @if (showBackdrop()) {
        <div
          class="aegov-modal-backdrop aegov-backdrop"
          (click)="onBackdropClick()"
        ></div>
      }

      <!-- Main Modal Container -->
      <div
        [id]="computedId()"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
        [attr.aria-labelledby]="titleId()"
        [attr.data-modal-placement]="placement()"
        [attr.data-modal-backdrop]="backdrop()"
        [class]="modalContainerClasses()"
        (click)="onModalClick($event)"
      >
        <!-- Modal Dialog Width Container -->
        <div [class]="dialogClasses()" (click)="$event.stopPropagation()">
          <!-- Modal Wrapper Box -->
          <div class="aegov-modal-wrapper p-4 md:p-5 xl:p-6" [class]="wrapperBgClass() || 'bg-whitely-50'">
            <!-- Close Button -->
            @if (showCloseButton()) {
              <button
                type="button"
                class="aegov-modal-close top-2 end-2"
                [attr.data-modal-hide]="computedId()"
                (click)="closeModal()"
                [attr.aria-label]="closeAriaLabel() || 'Close modal'"
              >
                <svg aeIcon name="x" [size]="20"></svg>
                <span class="sr-only">Close modal</span>
              </button>
            }

            <div>
              @if (title()) {
                <h2 [id]="titleId()" class="text-2xl font-semibold mb-4 sm:mb-6 text-aeblack-950">
                  {{ title() }}
                </h2>
              }

              <!-- Content Slot -->
              <ng-content></ng-content>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ModalComponent {
  /**
   * Unique HTML ID for modal (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Modal header title text (optional)
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Sizing preset: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full'
   */
  readonly size = input<ModalSize>('lg');

  /**
   * Visual theme variant: 'default' | 'serious' (serious adds .modal-serious)
   */
  readonly variant = input<ModalVariant>('default');

  /**
   * Viewport placement alignment:
   * 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
   */
  readonly placement = input<ModalPlacement>('center');

  /**
   * Backdrop behavior: 'dynamic' (closes on click) or 'static' (remains open)
   */
  readonly backdrop = input<'dynamic' | 'static'>('dynamic');

  /**
   * Whether to render the darkened backdrop overlay
   */
  readonly showBackdrop = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Whether to show top-end close 'X' button
   */
  readonly showCloseButton = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Accessible aria-label for close button
   */
  readonly closeAriaLabel = input<string | undefined>(undefined);

  /**
   * Whether Escape key dismisses the modal
   */
  readonly closeOnEscape = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Controlled open state
   */
  readonly isOpen = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Wrapper box custom background color class (e.g. 'bg-whitely-100' or 'bg-primary-50')
   */
  readonly wrapperBgClass = input<string>('');

  /**
   * Additional custom CSS classes for modal container
   */
  readonly className = input<string>('');

  /**
   * Additional custom CSS classes for inner dialog box
   */
  readonly dialogClassName = input<string>('');

  /**
   * Event emitted when open state changes
   */
  readonly openChange = output<boolean>();

  /**
   * Event emitted on modal close
   */
  readonly close = output<void>();

  /**
   * Event emitted on modal open
   */
  readonly open = output<void>();

  private readonly internalOpen = linkedSignal(() => !!this.isOpen());

  private readonly uniqueId = `modal-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);
  protected readonly titleId = computed(() => `${this.computedId()}-title`);

  protected readonly isVisible = computed(() => this.internalOpen());

  private readonly sizeClasses: Record<ModalSize, string> = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-lg',
    lg: 'lg:max-w-xl',
    xl: 'md:max-w-2xl',
    '2xl': 'md:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    full: 'w-full max-w-full',
  };

  private readonly placementClasses: Record<ModalPlacement, string> = {
    center: 'items-center justify-center',
    'top-left': 'items-start justify-start',
    'top-center': 'items-start justify-center',
    'top-right': 'items-start justify-end',
    'center-left': 'items-center justify-start',
    'center-right': 'items-center justify-end',
    'bottom-left': 'items-end justify-start',
    'bottom-center': 'items-end justify-center',
    'bottom-right': 'items-end justify-end',
  };

  protected readonly modalContainerClasses = computed<string>(() => {
    const v = this.variant();
    const p = this.placement();

    return cn(
      'aegov-modal flex z-50 fixed inset-0 overflow-y-auto overflow-x-hidden p-4',
      v === 'serious' && 'modal-serious',
      this.placementClasses[p] || this.placementClasses.center,
      this.className()
    );
  });

  protected readonly dialogClasses = computed<string>(() => {
    const sz = this.size();

    return cn(
      'relative w-full max-h-full',
      this.sizeClasses[sz] || this.sizeClasses.lg,
      this.dialogClassName()
    );
  });

  private readonly elementRef = inject(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private previousActiveElement: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const visible = this.isVisible();
      if (visible) {
        this.previousActiveElement = (this.doc?.activeElement as HTMLElement) || null;
        setTimeout(() => {
          this.focusFirstElement();
        }, 0);
      } else {
        if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
          this.previousActiveElement.focus();
          this.previousActiveElement = null;
        }
      }
    });
  }

  private focusFirstElement(): void {
    const root = this.elementRef.nativeElement as HTMLElement;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      const dialog = root.querySelector<HTMLElement>('[role="dialog"]');
      dialog?.focus();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isVisible()) return;

    if (event.key === 'Escape' && this.closeOnEscape()) {
      event.preventDefault();
      this.closeModal();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const root = this.elementRef.nativeElement as HTMLElement;
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.doc?.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (active === first || !root.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last || !root.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  protected onTriggerClick(): void {
    this.openModal();
  }

  protected onBackdropClick(): void {
    if (this.backdrop() !== 'static') {
      this.closeModal();
    }
  }

  protected onModalClick(event: MouseEvent): void {
    // If clicked on the modal backdrop container itself
    if (event.target === event.currentTarget && this.backdrop() !== 'static') {
      this.closeModal();
    }
  }

  openModal(): void {
    this.internalOpen.set(true);
    this.openChange.emit(true);
    this.open.emit();
  }

  closeModal(): void {
    this.internalOpen.set(false);
    this.openChange.emit(false);
    this.close.emit();
  }

  toggle(): void {
    if (this.isVisible()) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }
}
