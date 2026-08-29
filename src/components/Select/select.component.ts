import {
  Component,
  input,
  signal,
  computed,
  forwardRef,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'base' | 'lg';
export type SelectVariant = 'primary' | 'secondary';

@Component({
  selector: 'ae-select',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full relative">
      @if (label()) {
        <label
          [attr.for]="id()"
          [class]="labelClasses()"
        >
          {{ label() }}
        </label>
      }

      <button
        type="button"
        [id]="id()"
        [disabled]="disabled()"
        [class]="triggerClasses()"
        (click)="toggleOpen()"
        (blur)="onTouched()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'listbox'"
      >
        <span [class]="valueClasses()">
          {{ selectedLabel() || placeholder() }}
        </span>
        <ae-icon
          [name]="isOpen() ? 'caret-up' : 'caret-down'"
          [size]="20"
          class="text-aegold-700 font-bold transition-transform"
        ></ae-icon>
      </button>

      @if (isOpen()) {
        <div [class]="contentClasses()" role="listbox">
          <div class="max-h-[300px] overflow-auto py-1">
            @for (option of options(); track option.value) {
              <div
                role="option"
                [attr.aria-selected]="value() === option.value"
                [attr.aria-disabled]="option.disabled ? 'true' : null"
                [class]="itemClasses(option)"
                (click)="selectOption(option)"
              >
                <span class="flex-1">{{ option.label }}</span>
                @if (value() === option.value) {
                  <span class="absolute right-2 rtl:left-2 rtl:right-auto flex items-center justify-center">
                    <ae-icon name="check" [size]="16" class="text-primary-600 font-bold"></ae-icon>
                  </span>
                }
              </div>
            }
          </div>
        </div>
      }

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
export class SelectComponent implements ControlValueAccessor {
  readonly options = input<SelectOption[]>([]);
  readonly label = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly helperText = input<string | undefined>(undefined);
  readonly placeholder = input<string>('Select an option');
  readonly size = input<SelectSize>('base');
  readonly variant = input<SelectVariant>('primary');
  readonly id = input<string | undefined>(undefined);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly value = signal<string | undefined>(undefined);
  readonly isOpen = signal<boolean>(false);

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  readonly selectedLabel = computed(() => {
    const v = this.value();
    if (!v) return undefined;
    const found = this.options().find(o => o.value === v);
    return found?.label;
  });

  readonly effectiveSize = computed<SelectSize>(() => this.size() || 'base');
  readonly effectiveVariant = computed<SelectVariant>(() => this.variant() || 'primary');

  readonly sizeClasses = {
    sm: 'h-10 text-sm py-2.5',
    base: 'h-12 text-base py-3',
    lg: 'h-14 text-lg py-4'
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

  readonly triggerClasses = computed(() => {
    const variantClasses = {
      primary: 'focus-within:ring-primary-400 ring-primary-400',
      secondary: 'focus-within:ring-secondary-600 ring-secondary-400',
      error: 'focus-within:ring-red-600 ring-red-400 bg-red-50'
    };
    const variantKey = this.error() ? 'error' : this.effectiveVariant();

    return cn(
      'relative flex rtl:flex-row-reverse rtl:text-right w-full items-center justify-between rounded-lg shadow-xs ring-2 ring-inset focus:ring-2 focus:ring-inset bg-whitely-50 cursor-pointer',
      'px-4 text-left outline-hidden',
      variantClasses[variantKey],
      this.sizeClasses[this.effectiveSize()],
      this.disabled() && 'opacity-40 cursor-not-allowed',
      this.class()
    );
  });

  readonly valueClasses = computed(() =>
    cn(
      'truncate',
      !this.value() ? 'text-gray-400' : 'text-gray-900'
    )
  );

  readonly contentClasses = computed(() =>
    cn(
      'absolute top-full left-0 right-0 mt-1.5 overflow-hidden rounded-lg bg-white shadow-lg',
      'border border-gray-200 z-50'
    )
  );

  itemClasses(option: SelectOption): string {
    return cn(
      'relative flex rtl:flex-row-reverse rtl:text-right items-center px-4 py-2 text-gray-900',
      'hover:bg-primary-50 hover:text-primary-900 outline-hidden cursor-pointer transition-colors',
      option.disabled && 'text-gray-300 pointer-events-none cursor-not-allowed',
      this.labelSizeClasses[this.effectiveSize()]
    );
  }

  readonly helperClasses = computed(() =>
    cn(
      'mt-1 text-sm',
      this.error() ? 'text-red-600' : 'text-gray-500'
    )
  );

  onChange = (_value: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleOpen(): void {
    if (this.disabled()) return;
    this.isOpen.update(prev => !prev);
  }

  selectOption(option: SelectOption): void {
    if (option.disabled || this.disabled()) return;
    this.value.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.isOpen.set(false);
  }
}
