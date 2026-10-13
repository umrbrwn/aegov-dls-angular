import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../Icon/icon.directive';
import { cn } from '../../utils/cn';

export type BannerPosition = 'top' | 'bottom' | 'static';
export type BannerVariant = 'default' | 'camel' | 'red' | 'dark' | 'notice-primary' | 'notice-secondary';

export interface BannerAction {
  text: string;
  href?: string;
  onClick?: () => void;
}

@Component({
  selector: 'ae-banner',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div
        [attr.role]="role()"
        [attr.aria-label]="effectiveAriaLabel()"
        [class]="containerClasses()"
      >
        <div class="container">
          @if (isNotice()) {
            <div class="banner-notice">
              <div class="py-4 banner-content max-w-(--breakpoint-lg)">
                @if (title()) {
                  <h2
                    class="mb-4 text-xl font-bold"
                    [class.text-primary-800]="variant() === 'notice-primary'"
                    [class.text-aeblack-800]="variant() !== 'notice-primary'"
                  >
                    {{ title() }}
                  </h2>
                }
                <div
                  class="font-normal mb-0"
                  [class.text-primary-800]="variant() === 'notice-primary'"
                  [class.text-aeblack-800]="variant() !== 'notice-primary'"
                >
                  @if (content()) {
                    <p class="mb-0">{{ content() }}</p>
                  } @else {
                    <ng-content></ng-content>
                  }
                </div>
              </div>
              <div class="flex items-center shrink-0 gap-3">
                <ng-content select="[banner-actions], [actions]"></ng-content>
                @if (effectiveAction(); as act) {
                  <a
                    [href]="act.href || '#'"
                    class="aegov-btn"
                    [class.btn-primary]="variant() === 'notice-primary'"
                    [class.btn-secondary]="variant() !== 'notice-primary'"
                    (click)="handleActionClick($event, act)"
                  >
                    {{ act.text }}
                  </a>
                }
                @if (dismissible()) {
                  <button
                    type="button"
                    class="banner-dismiss"
                    aria-label="Close"
                    (click)="handleDismiss()"
                  >
                    <svg aeIcon name="x" [size]="20"></svg>
                  </button>
                }
              </div>
            </div>
          } @else if (variant() === 'dark') {
            <div class="flex items-center justify-between gap-3">
              <div class="banner-content text-whitely-50 flex flex-col md:flex-row md:items-center gap-3">
                @if (title()) {
                  <span class="font-bold">{{ title() }}</span>
                }
                @if (content()) {
                  <span>{{ content() }}</span>
                } @else {
                  <ng-content></ng-content>
                }
                @if (effectiveAction(); as act) {
                  <a
                    [href]="act.href || '#'"
                    class="aegov-link link-underline text-whitely-50 hover:text-whitely-100 focus-visible:ring-whitely-400 focus-visible:ring-offset-aeblack-700"
                    (click)="handleActionClick($event, act)"
                  >
                    {{ act.text }}
                    <svg aeIcon name="caret-right" [size]="20" class="rtl:-scale-x-100"></svg>
                  </a>
                }
              </div>
              @if (dismissible()) {
                <button
                  type="button"
                  class="banner-dismiss text-whitely-50"
                  aria-label="Close"
                  (click)="handleDismiss()"
                >
                  <svg aeIcon name="x" [size]="20"></svg>
                </button>
              }
            </div>
          } @else {
            <div class="flex items-center justify-between gap-3">
              <div
                class="banner-content flex-1 flex flex-wrap md:flex-nowrap items-center gap-3"
                [class.md:justify-center]="centered()"
                [class.justify-start]="!centered()"
                [class.text-camel-50]="variant() === 'camel'"
                [class.text-aered-600]="variant() === 'red'"
              >
                @if (title()) {
                  <span class="font-bold">{{ title() }}</span>
                }
                @if (content()) {
                  <span>{{ content() }}</span>
                } @else {
                  <ng-content></ng-content>
                }
                @if (effectiveAction(); as act) {
                  <a
                    [href]="act.href || '#'"
                    class="banner-link aegov-link link-underline"
                    [class.text-camel-50]="variant() === 'camel'"
                    [class.hover:text-camel-100]="variant() === 'camel'"
                    [class.focus-visible:ring-camel-400]="variant() === 'camel'"
                    [class.focus-visible:ring-offset-camel-600]="variant() === 'camel'"
                    [class.text-aered-600]="variant() === 'red'"
                    [class.hover:text-aered-700]="variant() === 'red'"
                    [class.focus-visible:ring-aered-400]="variant() === 'red'"
                    [class.focus-visible:ring-offset-aered-50]="variant() === 'red'"
                    (click)="handleActionClick($event, act)"
                  >
                    {{ act.text }}
                    <svg aeIcon name="caret-right" [size]="20" class="rtl:-scale-x-100"></svg>
                  </a>
                }
              </div>
              @if (dismissible()) {
                <button
                  type="button"
                  class="banner-dismiss shrink-0"
                  aria-label="Close"
                  (click)="handleDismiss()"
                >
                  <svg aeIcon name="x" [size]="20"></svg>
                </button>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class BannerComponent {
  /**
   * Position of the banner ('top' | 'bottom' | 'static')
   */
  readonly position = input<BannerPosition>('top');

  /**
   * Semantic color variant of the banner
   */
  readonly variant = input<BannerVariant>('default');

  /**
   * Banner title / headline
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Banner message content. Alternatively use content projection via <ng-content>
   */
  readonly content = input<string | undefined>(undefined);

  /**
   * Structured action link or button
   */
  readonly action = input<BannerAction | undefined>(undefined);

  /**
   * Action link text
   */
  readonly actionText = input<string | undefined>(undefined);

  /**
   * Action link URL destination
   */
  readonly actionHref = input<string | undefined>(undefined);

  /**
   * Whether the banner includes a close / dismiss button
   */
  readonly dismissible = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether content is centered horizontally (defaults to true)
   */
  readonly centered = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Whether the banner is fixed/sticky to the viewport
   */
  readonly sticky = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * ARIA role for accessibility ('region' | 'status' | 'alert' | 'banner')
   */
  readonly role = input<string>('region');

  /**
   * Accessible description label for the banner
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when the banner is dismissed
   */
  readonly dismiss = output<void>();
  readonly onDismiss = output<void>();

  /**
   * Event emitted when the action link is clicked
   */
  readonly actionClick = output<MouseEvent>();

  protected readonly isVisible = signal<boolean>(true);

  protected readonly isNotice = computed(() => {
    return this.variant() === 'notice-primary' || this.variant() === 'notice-secondary';
  });

  protected readonly effectiveAriaLabel = computed(() => {
    return this.ariaLabel() || this.title() || 'Announcement banner';
  });

  protected readonly effectiveAction = computed<BannerAction | undefined>(() => {
    if (this.action()) return this.action();
    if (this.actionText()) {
      return {
        text: this.actionText()!,
        href: this.actionHref() || '#'
      };
    }
    return undefined;
  });

  protected readonly containerClasses = computed(() => {
    const v = this.variant();
    const p = this.position();
    return cn(
      'aegov-banner',
      p === 'top' && 'banner-top',
      p === 'bottom' && 'banner-bottom',
      this.sticky() && (p === 'bottom' ? 'fixed bottom-0 left-0 right-0 z-50' : 'fixed top-0 left-0 right-0 z-50'),
      v === 'camel' && 'bg-camel-600 border-camel-500',
      v === 'red' && 'bg-aered-50 border-aered-500',
      v === 'dark' && 'bg-slate-700 rounded-xl',
      v === 'notice-primary' && 'bg-primary-50 border-primary-700',
      v === 'notice-secondary' && 'bg-slate-50 border-slate-700',
      this.className()
    );
  });

  protected handleDismiss(): void {
    this.isVisible.set(false);
    this.dismiss.emit();
    this.onDismiss.emit();
  }

  protected handleActionClick(event: MouseEvent, act: BannerAction): void {
    this.actionClick.emit(event);
    if (act.onClick) {
      event.preventDefault();
      act.onClick();
    }
  }

  show(): void {
    this.isVisible.set(true);
  }
}
