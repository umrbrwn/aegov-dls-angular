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

export type RangeSliderSize = 'sm' | 'base' | 'lg';
export type RangeSliderVariant = 'primary' | 'secondary';

@Component({
  selector: 'ae-range-slider',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeSliderComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="formControlClasses()">
      @if (label()) {
        <label [attr.for]="computedId()">
          {{ label() }}
          @if (required()) {
            <span class="text-aered-600 ms-0.5">*</span>
          }
        </label>
      }

      <div class="form-control-input items-center">
        <input
          type="range"
          [id]="computedId()"
          [name]="name() || computedId()"
          [min]="min()"
          [max]="max()"
          [step]="step()"
          [value]="internalValue()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          [attr.aria-describedby]="ariaDescribedBy()"
          (input)="onSliderInput($event)"
          (change)="onSliderChange()"
          (blur)="onSliderBlur()"
          (focus)="onSliderFocus()"
        />
        <output
          [attr.for]="computedId()"
          class="w-[50px] text-sm text-end h-auto bg-transparent py-1 font-medium"
        >
          {{ internalValue() }}
        </output>
      </div>

      @if (helperText() && !error()) {
        <p [id]="computedId() + '-desc'" class="mt-2 text-xs leading-6 text-aeblack-500">
          {{ helperText() }}
        </p>
      }

      @if (error()) {
        <p [id]="computedId() + '-error'" class="error-message">
          {{ error() }}
        </p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class RangeSliderComponent implements ControlValueAccessor {
  /**
   * HTML id attribute for the range input (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Form control name attribute
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Label text above the slider
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Initial / controlled value
   */
  readonly value = input<number | undefined>(undefined);

  /**
   * Minimum value of the range slider
   */
  readonly min = input<number>(0);

  /**
   * Maximum value of the range slider
   */
  readonly max = input<number>(100);

  /**
   * Step increment
   */
  readonly step = input<number>(1);

  /**
   * Sizing scale: 'sm' | 'base' | 'lg'
   */
  readonly size = input<RangeSliderSize>('base');

  /**
   * Visual colour variant: 'primary' | 'secondary'
   */
  readonly variant = input<RangeSliderVariant>('primary');

  /**
   * Helper / description text below the slider
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Error message (applies '.control-error')
   */
  readonly error = input<string | undefined>(undefined);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Required indicator
   */
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional CSS classes forwarded to the wrapper
   */
  readonly className = input<string>('');

  /** Emits when value changes via user interaction */
  readonly valueChange = output<number>();
  readonly blur = output<void>();
  readonly focus = output<void>();

  /** Internal reactive value kept in sync with the input() signal and CVA writeValue */
  protected readonly internalValue = signal<number>(20);

  private readonly uniqueId = `aegov-range-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  constructor() {
    effect(() => {
      const v = this.value();
      if (v !== undefined) {
        this.internalValue.set(v);
      }
    });
  }

  protected readonly formControlClasses = computed<string>(() => {
    const sz = this.size();
    const v = this.variant();
    const err = this.error();

    return cn(
      'aegov-form-control',
      sz === 'sm' && 'control-sm',
      sz === 'lg' && 'control-lg',
      v === 'secondary' && 'control-secondary',
      !!err && 'control-error',
      this.className()
    );
  });

  protected readonly ariaDescribedBy = computed<string | null>(() => {
    if (this.error()) return `${this.computedId()}-error`;
    if (this.helperText()) return `${this.computedId()}-desc`;
    return null;
  });

  protected onSliderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const num = Number(target.value);
    this.internalValue.set(num);
    this.onChange(num);
    this.valueChange.emit(num);
  }

  protected onSliderChange(): void {
    this.onTouched();
  }

  protected onSliderBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  protected onSliderFocus(): void {
    this.focus.emit();
  }

  // ControlValueAccessor
  protected onChange: (value: number) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: any): void {
    this.internalValue.set(val ?? this.min());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // handled via Angular input signal
  }
}
