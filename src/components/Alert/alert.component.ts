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
import { cn } from '../../utils/cn';
import { IconComponent, type IconName } from '../../icons/icon.component';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';
export type AlertSize = 'sm' | 'base' | 'lg';
export type AlertStyle = 'soft' | 'solid';

export interface AlertAction {
  text: string;
  href: string;
}

@Component({
  selector: 'ae-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div
        role="alert"
        [class]="alertClasses()"
      >
        @if (showIcon()) {
          <div class="shrink-0">
            <ae-icon
              [name]="iconName()"
              [size]="iconSizes[size()]"
              weight="fill"
              class="fill-current"
            ></ae-icon>
          </div>
        }

        <div class="flex-1">
          @if (title()) {
            <div [class]="titleClasses()">
              {{ title() }}
            </div>
          }
          <div [class]="textClasses()">
            <div [class]="action() ? 'flex justify-between items-start gap-6' : ''">
              <div>
                <ng-content></ng-content>
              </div>
              @if (action(); as act) {
                <div [class]="actionWrapperClasses()">
                  <a
                    [href]="act.href"
                    [class]="actionLinkClasses()"
                  >
                    {{ act.text }}
                    <ae-icon name="caret-right" [size]="actionIconSizes[size()]"></ae-icon>
                  </a>
                </div>
              }
            </div>
          </div>
        </div>

        @if (dismissible()) {
          <button
            type="button"
            (click)="handleDismiss()"
            aria-label="Close"
            class="shrink-0 rounded-full hover:opacity-50 transition-opacity duration-200 cursor-pointer"
          >
            <ae-icon
              name="x"
              [size]="iconSizes[size()]"
              [class]="style() === 'solid' ? 'text-whitely-50' : ''"
            ></ae-icon>
          </button>
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
  readonly variant = input<AlertVariant>('info');
  readonly title = input<string | undefined>(undefined);
  readonly size = input<AlertSize>('base');
  readonly style = input<AlertStyle>('soft');
  readonly action = input<AlertAction | undefined>(undefined);
  readonly showIcon = input<boolean, unknown>(true, { transform: booleanAttribute });
  readonly dismissible = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly dismiss = output<void>();
  readonly onDismiss = output<void>();

  readonly isVisible = signal<boolean>(true);

  readonly iconSizes: Record<AlertSize, number> = {
    sm: 20,
    base: 20,
    lg: 32
  };

  readonly actionIconSizes: Record<AlertSize, number> = {
    sm: 16,
    base: 20,
    lg: 24
  };

  readonly variantStyles = {
    info: {
      soft: 'bg-techblue-50 text-techblue-700',
      solid: 'bg-techblue-600 text-whitely-50',
      icon: 'info' as IconName,
      link: {
        soft: 'hover:text-techblue-600',
        solid: 'hover:text-whitely-100'
      }
    },
    warning: {
      soft: 'bg-camel-50 text-camel-700',
      solid: 'bg-camel-600 text-whitely-50',
      icon: 'warning' as IconName,
      link: {
        soft: 'hover:text-camel-600',
        solid: 'hover:text-whitely-100'
      }
    },
    success: {
      soft: 'bg-aegreen-50 text-aegreen-700',
      solid: 'bg-aegreen-600 text-whitely-50',
      icon: 'check-circle' as IconName,
      link: {
        soft: 'hover:text-aegreen-600',
        solid: 'hover:text-whitely-100'
      }
    },
    error: {
      soft: 'bg-aered-50 text-aered-700',
      solid: 'bg-aered-600 text-whitely-50',
      icon: 'x-circle' as IconName,
      link: {
        soft: 'hover:text-aered-600',
        solid: 'hover:text-whitely-100'
      }
    }
  };

  readonly sizeStyles: Record<AlertSize, { container: string; text: string }> = {
    sm: {
      container: 'px-4 py-3 gap-3',
      text: 'text-sm'
    },
    base: {
      container: 'px-6 py-4 gap-4',
      text: 'text-base'
    },
    lg: {
      container: 'px-7 py-5 gap-4',
      text: 'text-lg'
    }
  };

  readonly iconName = computed(() => this.variantStyles[this.variant()].icon);

  readonly alertClasses = computed(() => {
    const vStyle = this.variantStyles[this.variant()][this.style()];
    const sStyle = this.sizeStyles[this.size()];
    return cn(
      'relative flex items-start rounded-sm',
      vStyle,
      sStyle.container,
      this.class()
    );
  });

  readonly titleClasses = computed(() =>
    cn('font-semibold mb-5', this.sizeStyles[this.size()].text)
  );

  readonly textClasses = computed(() => this.sizeStyles[this.size()].text);

  readonly actionWrapperClasses = computed(() =>
    cn('shrink-0', this.size() === 'lg' ? 'text-base' : 'text-sm')
  );

  readonly actionLinkClasses = computed(() => {
    const linkHover = this.variantStyles[this.variant()].link[this.style()];
    return cn(
      'underline underline-offset-1 inline-flex items-center gap-2 font-medium hover:underline hover:underline-offset-2',
      linkHover
    );
  });

  handleDismiss(): void {
    this.isVisible.set(false);
    this.dismiss.emit();
    this.onDismiss.emit();
  }
}
