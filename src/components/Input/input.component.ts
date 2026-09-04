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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../utils/cn';
import { IconComponent } from '../Icon/icon.component';

export type InputSize = 'sm' | 'base' | 'lg';
export type InputVariant = 'primary' | 'secondary';

@Component({
  selector: 'ae-input',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      @if (label()) {
        <label
          [attr.for]="id()"
          [class]="labelClasses()"
        >
          {{ label() }}
        </label>
      }

      <div [class]="containerClasses()">
        <div class="flex select-none items-center ps-4 text-gray-500 empty:hidden">
          <ng-content select="[prefix], [slot=prefix]"></ng-content>
        </div>

        @if (type() === 'search' && !hasPrefix()) {
          <div class="flex select-none items-center ps-4 text-gray-500">
            <ae-icon name="magnifying-glass" [size]="24" class="text-gray-400"></ae-icon>
          </div>
        }

        <input
          [type]="currentType()"
          [id]="id()"
          [name]="name()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [class]="inputClasses()"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
        />

        <div class="flex select-none items-center pe-4 text-gray-500 empty:hidden">
          <ng-content select="[suffix], [slot=suffix]"></ng-content>
        </div>

        @if (type() === 'password') {
          <button
            type="button"
            (click)="togglePassword()"
            class="pe-4 text-gray-400 hover:text-gray-600 focus:outline-hidden cursor-pointer flex items-center"
            [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
          >
            @if (showPassword()) {
              <ae-icon name="eye-slash" [size]="24"></ae-icon>
            } @else {
              <ae-icon name="eye" [size]="24"></ae-icon>
            }
          </button>
        }
      </div>

      @if (error() || helperText()) {
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
export class InputComponent implements ControlValueAccessor {
  readonly type = input<string>('text');
  readonly label = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly helperText = input<string | undefined>(undefined);
  readonly size = input<InputSize>('base');
  readonly variant = input<InputVariant>('primary');
  readonly placeholder = input<string>('');
  readonly id = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');
  readonly hasPrefix = input<boolean, unknown>(false, { transform: booleanAttribute });

  readonly value = signal<string>('');
  readonly showPassword = signal<boolean>(false);

  readonly currentType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  readonly effectiveSize = computed<InputSize>(() => this.size() || 'base');
  readonly effectiveVariant = computed<InputVariant>(() => this.variant() || 'primary');

  readonly sizeClasses = {
    sm: 'h-10 text-sm',
    base: 'h-12 text-base',
    lg: 'h-14 text-lg'
  };

  readonly labelSizeClasses = {
    sm: 'text-sm',
    base: 'text-sm',
    lg: 'text-base'
  };

  readonly labelClasses = computed(() =>
    cn(
      'mb-1 block font-medium text-gray-900',
      this.labelSizeClasses[this.effectiveSize()],
      this.error() && 'text-red-600',
      this.required() && 'after:ms-0.5 after:text-red-500 after:content-["*"]'
    )
  );

  readonly containerClasses = computed(() => {
    const variantClasses = {
      primary: 'focus-within:ring-primary-support-400 ring-primary-400',
      secondary: 'focus-within:ring-secondary-600 ring-secondary-400',
      error: 'focus-within:ring-red-600 ring-red-400 bg-red-50'
    };

    const variantKey = this.error() ? 'error' : this.effectiveVariant();

    return cn(
      'relative flex rounded-lg shadow-xs ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset bg-whitely-50',
      variantClasses[variantKey],
      this.disabled() && 'opacity-40',
      this.class()
    );
  });

  readonly inputClasses = computed(() =>
    cn(
      'w-full flex-1 border-0 bg-transparent ps-4 text-gray-900 placeholder:text-gray-400',
      'focus:ring-0 outline-hidden disabled:cursor-not-allowed',
      this.sizeClasses[this.effectiveSize()]
    )
  );

  readonly helperClasses = computed(() =>
    cn(
      'mt-1 text-sm text-aeblack-500',
      this.error() ? 'text-red-600' : 'text-gray-500'
    )
  );

  onChange = (_value: string) => {};
  onTouched = () => {};

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  togglePassword(): void {
    this.showPassword.update(prev => !prev);
  }
}
