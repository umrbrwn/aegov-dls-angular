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

export type TextareaSize = 'sm' | 'base' | 'lg';
export type TextareaVariant = 'primary' | 'secondary';

@Component({
  selector: 'ae-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
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
        <textarea
          [id]="id()"
          [name]="name()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [rows]="rows()"
          [class]="textareaClasses()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          [attr.aria-invalid]="error() ? 'true' : null"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
        ></textarea>
      </div>

      @if (error() || helperText()) {
        <p [class]="helperClasses()">
          @if (error()) {
            <span class="font-medium">Error: </span>
          }
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
export class TextareaComponent implements ControlValueAccessor {
  readonly label = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly helperText = input<string | undefined>(undefined);
  readonly size = input<TextareaSize>('base');
  readonly variant = input<TextareaVariant>('primary');
  readonly placeholder = input<string>('');
  readonly id = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly rows = input<number>(4);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly value = signal<string>('');

  readonly effectiveSize = computed<TextareaSize>(() => this.size() || 'base');
  readonly effectiveVariant = computed<TextareaVariant>(() => this.variant() || 'primary');

  readonly sizeClasses: Record<TextareaSize, string> = {
    sm: 'text-sm py-2.5',
    base: 'text-base py-3',
    lg: 'text-lg py-3.5',
  };

  readonly labelSizeClasses: Record<TextareaSize, string> = {
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
      primary: 'focus-within:ring-primary-600 ring-primary-400',
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

  readonly textareaClasses = computed(() =>
    cn(
      'w-full flex-1 border-0 bg-transparent px-4 text-gray-900 placeholder:text-gray-400',
      'focus:ring-0 outline-hidden disabled:cursor-not-allowed resize-none',
      this.sizeClasses[this.effectiveSize()]
    )
  );

  readonly helperClasses = computed(() =>
    cn(
      'mt-1 text-sm',
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
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }
}
