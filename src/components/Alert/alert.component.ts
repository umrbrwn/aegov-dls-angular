import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { IconDirective, type IconName } from '../Icon/icon.directive';
import { cn } from '../../utils/cn';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'info' | 'error' | 'success' | 'warning';
export type AlertTone = 'soft' | 'solid';

@Component({
  selector: 'ae-alert',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div
        role="alert"
        [class]="alertClasses()"
      >
        @if (showIcon()) {
          <div class="alert-icon">
            <svg
              aeIcon
              [name]="effectiveIcon()"
              [size]="28"
            ></svg>
          </div>
        }

        @if (hasLink()) {
          <div class="alert-content" [class.alert-with-link]="hasLink()">
            <div>
              @if (title()) {
                <div class="alert-title">{{ title() }}</div>
              }
              @if (content()) {
                <p>{{ content() }}</p>
              } @else {
                <ng-content></ng-content>
              }
            </div>
            <p class="alert-link">
              <a [href]="linkHref()">
                {{ linkText() }}
                <svg aeIcon name="arrow-right" [size]="20" class="rtl:-scale-x-100"></svg>
              </a>
            </p>
          </div>
        } @else {
          <div class="alert-content" [class.alert-with-link]="hasLink()">
            @if (title()) {
              <div class="alert-title">{{ title() }}</div>
            }
            @if (content()) {
              <p>{{ content() }}</p>
            } @else {
              <ng-content></ng-content>
            }
          </div>
        }

        @if (dismissible()) {
          <div class="alert-dismiss">
            <button
              type="button"
              aria-label="Close"
              (click)="handleDismiss()"
            >
              <svg aeIcon name="x" [size]="20"></svg>
            </button>
          </div>
        }
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
export class AlertComponent {
  /**
   * Type/color variant of the alert ('info' | 'error' | 'success' | 'warning')
   */
  readonly variant = input<AlertVariant>('info');

  /**
   * Tone/appearance style of the alert ('soft' | 'solid')
   */
  readonly tone = input<AlertTone>('soft');

  /**
   * Optional title displayed at the top of the alert content
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Main message text. Alternatively, use content projection via <ng-content>
   */
  readonly content = input<string | undefined>(undefined);

  /**
   * Whether to display the visual cue icon (defaults to true)
   */
  readonly showIcon = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Custom icon name to override the default variant icon
   */
  readonly icon = input<IconName | undefined>(undefined);

  /**
   * Whether the alert includes a close/dismiss trigger button
   */
  readonly dismissible = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Action link label text (displays an inline action link on the right side)
   */
  readonly linkText = input<string | undefined>(undefined);

  /**
   * Action link target URL
   */
  readonly linkHref = input<string>('#');

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when the alert is dismissed
   */
  readonly dismiss = output<void>();
  readonly onDismiss = output<void>();

  /**
   * Internal visibility state
   */
  protected readonly isVisible = signal<boolean>(true);

  private readonly defaultIcons: Record<AlertVariant, IconName> = {
    info: 'info',
    error: 'warning-circle',
    success: 'check-circle',
    warning: 'warning',
  };

  protected readonly effectiveIcon = computed<IconName>(() => {
    return this.icon() || this.defaultIcons[this.variant()] || 'info';
  });

  protected readonly hasLink = computed<boolean>(() => !!this.linkText());

  protected readonly alertClasses = computed(() => {
    return cn(
      'aegov-alert',
      `alert-${this.variant()}`,
      this.tone() === 'solid' ? 'alert-solid' : 'alert-soft',
      this.className()
    );
  });

  protected handleDismiss(): void {
    this.isVisible.set(false);
    this.dismiss.emit();
    this.onDismiss.emit();
  }

  show(): void {
    this.isVisible.set(true);
  }
}
