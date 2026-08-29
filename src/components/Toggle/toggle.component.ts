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

export type ToggleVariant = 'default' | 'success' | 'mode' | 'secondary';

@Component({
  selector: 'ae-toggle',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="wrapperClasses()">
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="isChecked()"
        [attr.aria-disabled]="disabled() ? 'true' : null"
        [disabled]="disabled()"
        [class]="rootClasses()"
        (click)="toggle()"
        (blur)="onTouched()"
      >
        <span [class]="thumbClasses()">
          @if (variant() === 'mode') {
            @if (isChecked()) {
              <ae-icon name="moon" [size]="16" class="text-whitely-50"></ae-icon>
            } @else {
              <ae-icon name="sun" [size]="16" class="text-aeblack-950"></ae-icon>
            }
          }
        </span>
      </button>

      @if (label()) {
        <span class="ms-3 text-sm font-medium text-gray-900 select-none cursor-pointer">
          {{ label() }}
        </span>
      }
    </label>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class ToggleComponent implements ControlValueAccessor {
  readonly variant = input<ToggleVariant>('default');
  readonly label = input<string | undefined>(undefined);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly checked = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly checkedChange = output<boolean>();

  readonly isChecked = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isChecked.set(this.checked());
    });
  }

  readonly effectiveVariant = computed<ToggleVariant>(() => this.variant() || 'default');

  readonly variants = {
    default: {
      root: 'bg-aeblack-100 data-[state=checked]:bg-primary-300',
      thumb: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:border-primary-600',
    },
    success: {
      root: 'bg-aeblack-100 data-[state=checked]:bg-aegreen-300',
      thumb: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:border-aegreen-600',
    },
    secondary: {
      root: 'bg-aeblack-100 data-[state=checked]:bg-secondary-800',
      thumb: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:border-secondary-600',
    },
    mode: {
      root: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:bg-aeblack-950',
      thumb: 'bg-transparent border-transparent flex items-center justify-center',
    },
  };

  readonly wrapperClasses = computed(() =>
    cn('relative inline-flex cursor-pointer items-center', this.class())
  );

  readonly rootClasses = computed(() => {
    const v = this.effectiveVariant();
    const checkedState = this.isChecked();
    const variantStyle = this.variants[v];

    return cn(
      'relative flex items-center h-4 w-10 cursor-pointer rounded-full outline-hidden transition-colors',
      'focus-visible:outline-solid focus-visible:outline-offset-[3px] focus-visible:outline-primary-500',
      'disabled:cursor-not-allowed disabled:opacity-30',
      v === 'mode' && 'h-6 w-12',
      checkedState
        ? variantStyle.root.replace('bg-aeblack-100', '').replace('bg-whitely-50 border border-aeblack-100', '') +
          ' ' +
          (v === 'default' ? 'bg-primary-300' : v === 'success' ? 'bg-aegreen-300' : v === 'secondary' ? 'bg-secondary-800' : 'bg-aeblack-950')
        : (v === 'mode' ? 'bg-whitely-50 border border-aeblack-100' : 'bg-aeblack-100')
    );
  });

  readonly thumbClasses = computed(() => {
    const v = this.effectiveVariant();
    const checkedState = this.isChecked();

    if (v === 'mode') {
      return cn(
        'absolute block rounded-full shadow-sm transition-transform duration-300 top-1/2 -translate-y-1/2',
        'h-4 w-4 bg-transparent border-transparent flex items-center justify-center',
        checkedState ? 'translate-x-7 rtl:-translate-x-7' : 'translate-x-1 rtl:-translate-x-1'
      );
    }

    const borderStyle = checkedState
      ? (v === 'default' ? 'border-primary-600' : v === 'success' ? 'border-aegreen-600' : 'border-secondary-600')
      : 'border-aeblack-100';

    return cn(
      'absolute block h-5 w-5 rounded-full shadow-sm transition-transform duration-300 top-1/2 -translate-y-1/2 bg-whitely-50 border',
      borderStyle,
      checkedState ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'
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
