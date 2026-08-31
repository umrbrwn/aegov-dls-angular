import {
  Component,
  input,
  output,
  signal,
  computed,
  forwardRef,
  inject,
  effect,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../utils/cn';

export type RadioSize = 'sm' | 'base' | 'lg';
export type RadioVariant = 'primary' | 'secondary';
export type RadioOrientation = 'horizontal' | 'vertical';

const sizeStyles = {
  sm: {
    radio: 'h-4 w-4',
    indicator: 'h-2 w-2',
    label: 'text-sm',
    description: 'text-xs',
  },
  base: {
    radio: 'h-5 w-5',
    indicator: 'h-2.5 w-2.5',
    label: 'text-base',
    description: 'text-sm',
  },
  lg: {
    radio: 'h-6 w-6',
    indicator: 'h-3 w-3',
    label: 'text-lg',
    description: 'text-base',
  },
};

const variantStyles = {
  primary: {
    radio: 'border-primary-400 focus-visible:ring-primary-500 before:bg-primary-50',
    indicator: 'bg-aegold-450',
    hover: 'hover:border-primary-500 before:absolute before:inset-s-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100',
  },
  secondary: {
    radio: 'border-secondary-400 focus-visible:ring-secondary-500 before:bg-secondary-50',
    indicator: 'bg-secondary-800',
    hover: 'hover:border-secondary-500 before:absolute before:inset-s-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100',
  },
};

@Component({
  selector: 'ae-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      role="radiogroup"
      [attr.aria-required]="required() ? 'true' : null"
      [class]="groupClasses()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class RadioGroupComponent implements ControlValueAccessor {
  readonly name = input<string | undefined>(undefined);
  readonly defaultValue = input<string | undefined>(undefined);
  readonly value = input<string | undefined>(undefined);
  readonly size = input<RadioSize>('base');
  readonly variant = input<RadioVariant>('primary');
  readonly orientation = input<RadioOrientation>('vertical');
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly change = output<string>();

  readonly internalValue = signal<string | undefined>(undefined);

  constructor() {
    effect(() => {
      const v = this.value();
      if (v !== undefined) {
        this.internalValue.set(v);
      } else {
        const def = this.defaultValue();
        if (def !== undefined) {
          this.internalValue.set(def);
        }
      }
    });
  }

  readonly selectedValue = computed(() => this.internalValue());

  readonly effectiveSize = computed<RadioSize>(() => this.size() || 'base');
  readonly effectiveVariant = computed<RadioVariant>(() => this.variant() || 'primary');
  readonly effectiveOrientation = computed<RadioOrientation>(() => this.orientation() || 'vertical');

  readonly groupClasses = computed(() =>
    cn(
      'space-y-6',
      this.effectiveOrientation() === 'horizontal' && 'flex space-x-8 space-y-0 rtl:space-x-reverse',
      this.class()
    )
  );

  onChange = (_value: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.internalValue.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  select(val: string): void {
    if (this.disabled()) return;
    this.internalValue.set(val);
    this.change.emit(val);
    this.onChange(val);
    this.onTouched();
  }
}

@Component({
  selector: 'ae-radio-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      <button
        type="button"
        role="radio"
        [id]="computedId()"
        [attr.aria-checked]="isSelected()"
        [attr.aria-disabled]="isDisabled() ? 'true' : null"
        [disabled]="isDisabled()"
        [class]="buttonClasses()"
        (click)="select()"
      >
        @if (isSelected()) {
          <span [class]="indicatorClasses()"></span>
        }
      </button>

      <div class="flex-1">
        <label
          [attr.for]="computedId()"
          [class]="labelClasses()"
        >
          @if (label()) {
            {{ label() }}
          } @else {
            <ng-content></ng-content>
          }
        </label>
        @if (description()) {
          <p [class]="descriptionClasses()">
            {{ description() }}
          </p>
        }
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
export class RadioItemComponent {
  private readonly group = inject(RadioGroupComponent, { optional: true });

  readonly value = input.required<string>();
  readonly id = input<string | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  private readonly generatedId = `radio-${Math.random().toString(36).slice(2, 9)}`;
  readonly computedId = computed(() => this.id() || this.generatedId);

  readonly isSelected = computed(() => this.group ? this.group.selectedValue() === this.value() : false);
  readonly isDisabled = computed(() => this.disabled() || (this.group ? this.group.disabled() : false));

  readonly size = computed(() => this.group?.effectiveSize() || 'base');
  readonly variant = computed(() => this.group?.effectiveVariant() || 'primary');

  readonly wrapperClasses = computed(() =>
    cn('flex rtl:flex-row-reverse rtl:text-right items-start gap-4 cursor-pointer w-full', this.class())
  );

  readonly buttonClasses = computed(() =>
    cn(
      'relative border-2 rounded-full bg-whitely-50 shrink-0 mt-[3px] cursor-pointer',
      'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:border-primary-200 disabled:before:hidden! disabled:pointer-events-none',
      'transition-colors',
      sizeStyles[this.size()]?.radio,
      variantStyles[this.variant()]?.radio,
      variantStyles[this.variant()]?.hover
    )
  );

  readonly indicatorClasses = computed(() =>
    cn(
      'flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
      sizeStyles[this.size()]?.indicator,
      variantStyles[this.variant()]?.indicator
    )
  );

  readonly labelClasses = computed(() =>
    cn(
      'text-aeblack-800 font-semibold block select-none cursor-pointer',
      this.isDisabled() && 'text-aeblack-300 cursor-not-allowed',
      this.group?.required() && 'after:ms-0.5 after:text-red-500 after:content-["*"]',
      sizeStyles[this.size()]?.label
    )
  );

  readonly descriptionClasses = computed(() =>
    cn(
      'text-aeblack-400 mt-1',
      this.isDisabled() && 'text-aeblack-200',
      sizeStyles[this.size()]?.description
    )
  );

  select(): void {
    if (this.isDisabled()) return;
    this.group?.select(this.value());
  }
}
