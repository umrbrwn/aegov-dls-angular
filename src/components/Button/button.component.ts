import { Component, input, computed, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

export type ButtonStyle = 'primary' | 'secondary';
export type ButtonVariant = 'solid' | 'soft' | 'link' | 'outline' | 'outline-solid';
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg';

const styleVariants = {
  primary: {
    solid: 'bg-primary-600 text-whitely-50 hover:bg-primary-500 hover:text-primary-50 hover:ring-4 hover:ring-primary-100 hover:shadow-primary-100 focus-visible:ring-primary-support-300',
    soft: 'bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-600 focus-visible:ring-primary-support-400 hover:shadow-none focus-visible:ring-offset-0 disabled:opacity-50',
    link: 'text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-support-400 focus-visible:border-primary-support-400 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0',
    outline: 'text-primary-600 hover:bg-primary-50 border-primary-600 focus-visible:border-primary-support-400 focus-visible:ring-primary-support-400 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0',
    'outline-solid': 'text-primary-600 hover:bg-primary-50 border-primary-600 focus-visible:border-primary-support-400 focus-visible:ring-primary-support-400 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0'
  },
  secondary: {
    solid: 'bg-secondary-800 text-secondary-50 hover:bg-secondary-950 hover:text-secondary-100 hover:ring-4 hover:ring-secondary-100 hover:shadow-secondary-100 focus-visible:ring-secondary-support-300',
    soft: 'bg-secondary-50 hover:bg-secondary-100 text-secondary-800 hover:text-secondary-800 hover:shadow-none focus-visible:ring-offset-0 disabled:opacity-50',
    link: 'text-secondary-800 hover:bg-secondary-50 focus-visible:border-secondary-support-300 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0',
    outline: 'text-secondary-800 hover:bg-secondary-100 border-secondary-800 focus-visible:border-secondary-support-300 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0',
    'outline-solid': 'text-secondary-800 hover:bg-secondary-100 border-secondary-800 focus-visible:border-secondary-support-300 bg-transparent hover:shadow-none focus-visible:ring-1 focus-visible:ring-offset-0'
  }
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'h-8 rounded-sm px-4 text-sm',
  sm: 'h-10 rounded-md px-5 text-base',
  base: 'h-12 gap-2 rounded-lg px-6',
  lg: 'h-13 gap-3 px-7 text-lg'
};

const iconSizeClasses: Record<ButtonSize, string> = {
  xs: 'w-8',
  sm: 'w-10',
  base: 'w-12',
  lg: 'w-14'
};

export function getButtonClasses(config: {
  style?: ButtonStyle;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  isIcon?: boolean;
  disabled?: boolean;
  className?: string;
}): string {
  const s = config.style || 'primary';
  const v = config.variant || 'solid';
  const sz = config.size || 'base';
  const variantClass = styleVariants[s]?.[v] || styleVariants.primary.solid;
  const sizeClass = sizeClasses[sz] || sizeClasses.base;
  const iconClass = config.isIcon ? `gap-0 px-0 ${iconSizeClasses[sz] || ''}` : '';
  const disabledClass = config.disabled
    ? 'pointer-events-none cursor-not-allowed opacity-30 shadow-none!'
    : '';

  return cn(
    'inline-flex shrink-0 cursor-pointer select-none flex-wrap items-center justify-center text-center no-underline transition duration-200 ease-in-out',
    'rounded-lg border-2 border-transparent font-medium focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none!',
    variantClass,
    sizeClass,
    config.block ? 'w-full' : '',
    iconClass,
    disabledClass,
    config.className
  );
}

@Component({
  selector: 'ae-button, button[ae-button], a[ae-button]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.block]': 'block()',
    '[class.w-full]': 'block()',
    '[class.inline-block]': '!block()',
  },
  template: `
    <ng-template #btnContent>
      <ng-content></ng-content>
    </ng-template>

    @if (href()) {
      <a
        [href]="disabled() ? null : href()"
        [target]="target()"
        [rel]="rel()"
        [class]="computedClasses()"
        [tabindex]="disabled() ? -1 : null"
        [attr.aria-disabled]="disabled() ? true : null"
        (click)="disabled() ? $event.preventDefault() : null"
      >
        <ng-container *ngTemplateOutlet="btnContent"></ng-container>
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        [attr.aria-disabled]="disabled() ? true : null"
        [class]="computedClasses()"
      >
        <ng-container *ngTemplateOutlet="btnContent"></ng-container>
      </button>
    }
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    :host.block, :host.w-full, :host([block="true"]) {
      display: block !important;
      width: 100% !important;
    }
  `]
})
export class ButtonComponent {
  readonly style = input<ButtonStyle>('primary');
  readonly variant = input<ButtonVariant>('solid');
  readonly size = input<ButtonSize>('base');
  readonly block = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly isIcon = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly href = input<string | undefined>(undefined);
  readonly target = input<string | undefined>(undefined);
  readonly rel = input<string | undefined>(undefined);
  readonly class = input<string>('');

  readonly computedClasses = computed(() =>
    getButtonClasses({
      style: this.style(),
      variant: this.variant(),
      size: this.size(),
      block: this.block(),
      isIcon: this.isIcon(),
      disabled: this.disabled(),
      className: this.class()
    })
  );
}
