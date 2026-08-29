import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  forwardRef,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

export type CheckboxSize = 'sm' | 'base' | 'lg';
export type CheckboxVariant = 'primary' | 'secondary';

@Component({
  selector: 'ae-checkbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      <button
        type="button"
        role="checkbox"
        [id]="computedId()"
        [attr.aria-checked]="isChecked()"
        [attr.aria-disabled]="disabled() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [disabled]="disabled()"
        [class]="buttonClasses()"
        (click)="toggle()"
        (blur)="onTouched()"
      >
        @if (isChecked()) {
          <span class="flex items-center justify-center text-whitely-50">
            <ae-icon name="check" [size]="iconSizes[effectiveSize()]" class="stroke-[3]"></ae-icon>
          </span>
        }
      </button>

      @if (label() || description()) {
        <div class="flex flex-col gap-2">
          @if (label()) {
            <label
              [attr.for]="computedId()"
              [class]="labelClasses()"
              (click)="toggle()"
            >
              {{ label() }}
            </label>
          }
          @if (description()) {
            <p [class]="descriptionClasses()">
              {{ description() }}
            </p>
          }
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
export class CheckboxComponent implements ControlValueAccessor {
  readonly id = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly value = input<string | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly size = input<CheckboxSize>('base');
  readonly variant = input<CheckboxVariant>('primary');
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly checked = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly checkedChange = output<boolean>();

  readonly isChecked = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isChecked.set(this.checked());
    });
  }

  readonly effectiveSize = computed<CheckboxSize>(() => this.size() || 'base');
  readonly effectiveVariant = computed<CheckboxVariant>(() => this.variant() || 'primary');

  readonly iconSizes: Record<CheckboxSize, number> = {
    sm: 12,
    base: 16,
    lg: 20
  };

  private readonly generatedId = `checkbox-${Math.random().toString(36).slice(2, 9)}`;
  readonly computedId = computed(() => this.id() || this.generatedId);

  readonly wrapperClasses = computed(() => cn('flex items-start gap-4', this.class()));

  readonly buttonClasses = computed(() => {
    const s = this.effectiveSize();
    const v = this.effectiveVariant();
    const isChk = this.isChecked();

    const sizeStyles = {
      sm: 'h-4 w-4',
      base: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    const variantStyles = {
      primary: cn(
        'border-aegold-450 before:bg-primary-50 focus:ring-primary-400',
        isChk && 'bg-aegold-450 border-aegold-450',
        'hover:border-primary-500 before:absolute before:inset-s-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100 rtl:before:translate-x-2/4',
        'focus-visible:ring-primary-500'
      ),
      secondary: cn(
        'border-secondary-400 before:bg-secondary-50',
        isChk && 'bg-secondary-800 border-secondary-800',
        'hover:border-secondary-500 before:absolute before:inset-s-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100 rtl:before:translate-x-2/4',
        'focus-visible:ring-secondary-500'
      )
    };

    return cn(
      'flex shrink-0 items-center justify-center rounded-sm border bg-whitely-50 transition-colors relative cursor-pointer',
      'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:before:hidden! disabled:pointer-events-none',
      sizeStyles[s],
      variantStyles[v]
    );
  });

  readonly labelClasses = computed(() => {
    const sizeStyles = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg'
    };
    return cn(
      'text-aeblack-800 font-medium leading-none -mt-0.5 cursor-pointer select-none',
      this.disabled() && 'text-aeblack-300 cursor-not-allowed',
      this.required() && 'after:ms-0.5 after:text-red-500 after:content-["*"]',
      sizeStyles[this.effectiveSize()]
    );
  });

  readonly descriptionClasses = computed(() => {
    const sizeStyles = {
      sm: 'text-xs',
      base: 'text-sm',
      lg: 'text-base'
    };
    return cn(
      'text-aeblack-400 leading-snug',
      this.disabled() && 'text-aeblack-200',
      sizeStyles[this.effectiveSize()]
    );
  });

  onChange = (_value: boolean) => {};
  onTouched = () => {};

  writeValue(val: boolean): void {
    this.isChecked.set(!!val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggle(): void {
    if (this.disabled()) return;
    const next = !this.isChecked();
    this.isChecked.set(next);
    this.onChange(next);
    this.onTouched();
    this.checkedChange.emit(next);
  }
}
