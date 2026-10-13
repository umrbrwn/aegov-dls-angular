import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../Icon/icon.directive';
import { ButtonDirective } from '../Button/button.directive';
import { cn } from '../../utils/cn';

@Component({
  selector: 'ae-toast',
  standalone: true,
  imports: [CommonModule, IconDirective, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible() && show()) {
      <div
        [id]="computedId()"
        [class]="toastClasses()"
        role="alert"
      >
        <div class="flex items-start">
          @if (icon()) {
            <div class="toast-icon" [class]="iconColor()">
              <svg aeIcon [name]="icon()!" [size]="iconSize()"></svg>
            </div>
          }

          <div class="toast-body">
            @if (title()) {
              <span class="mb-1 text-base font-semibold text-aeblack-900 block">{{ title() }}</span>
            }

            @if (message()) {
              <div class="mb-2 font-normal">{{ message() }}</div>
            }

            <ng-content></ng-content>

            @if (actionText()) {
              @if (actionHref()) {
                <a
                  [href]="actionHref()"
                  aeButton
                  size="xs"
                  (click)="onActionClick($event)"
                >
                  {{ actionText() }}
                </a>
              } @else {
                <button
                  type="button"
                  aeButton
                  size="xs"
                  (click)="onActionClick($event)"
                >
                  {{ actionText() }}
                </button>
              }
            }
          </div>

          @if (dismissible()) {
            <button
              type="button"
              class="toast-dismiss cursor-pointer"
              [attr.data-dismiss-target]="'#' + computedId()"
              [attr.aria-label]="dismissAriaLabel()"
              (click)="dismissToast()"
            >
              <span class="sr-only">{{ dismissAriaLabel() }}</span>
              <svg aeIcon name="x" [size]="32"></svg>
            </button>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent {
  /**
   * Unique ID for toast identification and data-dismiss-target
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Main title text (e.g. sender name or heading)
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Body message description text
   */
  readonly message = input<string | undefined>(undefined);

  /**
   * Icon name (e.g. 'info', 'check-circle', 'warning', 'x-circle')
   */
  readonly icon = input<string | undefined>('info');

  /**
   * Icon color CSS class (e.g. 'text-primary-600', 'text-aegreen-600')
   */
  readonly iconColor = input<string>('text-primary-600');

  /**
   * Icon size in pixels
   */
  readonly iconSize = input<number>(32);

  /**
   * Optional action button text (e.g. 'Replay', 'Undo')
   */
  readonly actionText = input<string | undefined>(undefined);

  /**
   * Optional href for action link
   */
  readonly actionHref = input<string | undefined>(undefined);

  /**
   * Whether to show close dismiss button
   */
  readonly dismissible = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Accessible aria-label for dismiss button
   */
  readonly dismissAriaLabel = input<string>('Close');

  /**
   * Controls toast visibility
   */
  readonly show = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when toast is dismissed
   */
  readonly dismiss = output<void>();

  /**
   * Event emitted when action button is clicked
   */
  readonly actionClick = output<MouseEvent>();

  protected readonly isVisible = signal<boolean>(true);

  private readonly uniqueId = `toast-message-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  protected readonly toastClasses = computed(() =>
    cn('w-full max-w-xs aegov-toast relative z-10', this.className())
  );

  dismissToast(): void {
    this.isVisible.set(false);
    this.dismiss.emit();
  }

  protected onActionClick(event: MouseEvent): void {
    this.actionClick.emit(event);
  }
}
