import {
  Component,
  input,
  signal,
  computed,
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
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      @if (label()) {
        <label
          [attr.for]="computedId()"
          [class]="labelClasses()"
        >
          {{ label() }}
        </label>
      }

      <div class="flex items-center gap-4">
        <!-- Slider Container -->
        <div class="relative flex w-full touch-none select-none items-center py-2">
          <!-- Background Track -->
          <div [class]="trackClasses()">
            <!-- Range Active Fill -->
            <div
              [class]="rangeClasses()"
              [style.width.%]="percentage()"
            ></div>
          </div>

          <!-- Thumb -->
          <div
            [class]="thumbClasses()"
            [style.left.%]="percentage()"
            aria-hidden="true"
          ></div>

          <!-- Interactive Native Input (Transparent Overlay) -->
          <input
            type="range"
            [id]="computedId()"
            [min]="min()"
            [max]="max()"
            [step]="step()"
            [value]="value()"
            [disabled]="disabled()"
            class="group absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
            (input)="onInputChange($event)"
            (change)="onCommit()"
            (focus)="isFocused.set(true)"
            (blur)="onInputBlur()"
          />
        </div>

        <output
          [attr.for]="computedId()"
          [class]="outputClasses()"
        >
          {{ value() }}
        </output>
      </div>

      @if (helperText() || error()) {
        <p [class]="helperClasses()">
          {{ error() || helperText() }}
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
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly label = input<string | undefined>(undefined);
  readonly helperText = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly size = input<RangeSliderSize>('base');
  readonly variant = input<RangeSliderVariant>('primary');
  readonly id = input<string | undefined>(undefined);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly value = signal<number>(20);
  readonly isFocused = signal<boolean>(false);

  private readonly generatedId = `range-${Math.random().toString(36).slice(2, 9)}`;
  readonly computedId = computed(() => this.id() || this.generatedId);

  readonly percentage = computed(() => {
    const min = this.min();
    const max = this.max();
    const val = this.value();
    if (max <= min) return 0;
    return Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));
  });

  readonly sizeStyles: Record<RangeSliderSize, { track: string; thumb: string; label: string; helperText: string }> = {
    sm: {
      track: 'h-1',
      thumb: 'h-3.5 w-3.5',
      label: 'text-sm',
      helperText: 'text-xs',
    },
    base: {
      track: 'h-1.5',
      thumb: 'h-4 w-4',
      label: 'text-base',
      helperText: 'text-sm',
    },
    lg: {
      track: 'h-2',
      thumb: 'h-5 w-5',
      label: 'text-lg',
      helperText: 'text-base',
    },
  };

  readonly variantStyles: Record<RangeSliderVariant, { track: string; range: string; thumb: string; focusRing: string }> = {
    primary: {
      track: 'bg-primary-100',
      range: 'bg-primary-600',
      thumb: 'border-primary-600',
      focusRing: 'ring-2 ring-primary-500 ring-offset-2',
    },
    secondary: {
      track: 'bg-secondary-100',
      range: 'bg-secondary-800',
      thumb: 'border-secondary-800',
      focusRing: 'ring-2 ring-secondary-500 ring-offset-2',
    },
  };

  readonly effectiveSize = computed<RangeSliderSize>(() => this.size() || 'base');
  readonly effectiveVariant = computed<RangeSliderVariant>(() => this.variant() || 'primary');

  readonly wrapperClasses = computed(() => cn('w-full', this.class()));

  readonly labelClasses = computed(() => {
    const s = this.sizeStyles[this.effectiveSize()];
    return cn(
      'mb-1.5 block font-medium text-gray-900',
      s.label,
      this.error() && 'text-red-600',
      this.required() && 'after:ms-0.5 after:text-red-500 after:content-["*"]',
      this.disabled() && 'opacity-50'
    );
  });

  readonly trackClasses = computed(() => {
    const s = this.sizeStyles[this.effectiveSize()];
    const v = this.variantStyles[this.effectiveVariant()];
    return cn(
      'relative grow rounded-full w-full',
      s.track,
      v.track,
      this.disabled() && 'opacity-50'
    );
  });

  readonly rangeClasses = computed(() => {
    const s = this.sizeStyles[this.effectiveSize()];
    const v = this.variantStyles[this.effectiveVariant()];
    return cn(
      'absolute rounded-full h-full',
      s.track,
      v.range,
      this.disabled() && 'opacity-50'
    );
  });

  readonly thumbClasses = computed(() => {
    const s = this.sizeStyles[this.effectiveSize()];
    const v = this.variantStyles[this.effectiveVariant()];
    return cn(
      'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 bg-white shadow-xs transition-colors pointer-events-none z-10',
      s.thumb,
      v.thumb,
      this.isFocused() && v.focusRing,
      this.disabled() && 'opacity-50 pointer-events-none'
    );
  });

  readonly outputClasses = computed(() => {
    const s = this.sizeStyles[this.effectiveSize()];
    return cn(
      'w-12 text-right rtl:text-left text-gray-900 font-medium',
      s.label,
      this.disabled() && 'opacity-50'
    );
  });

  readonly helperClasses = computed(() => {
    const s = this.sizeStyles[this.effectiveSize()];
    return cn(
      'mt-1.5',
      s.helperText,
      this.error() ? 'text-red-600' : 'text-gray-500'
    );
  });

  onChange = (_value: number) => {};
  onTouched = () => {};

  writeValue(val: number): void {
    if (val !== undefined && val !== null) {
      this.value.set(Number(val));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const num = Number(target.value);
    this.value.set(num);
    this.onChange(num);
  }

  onCommit(): void {
    this.onTouched();
  }

  onInputBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }
}
