import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  forwardRef,
  inject,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../utils/cn';

export type RadioSize = 'sm' | 'base' | 'lg';
export type RadioVariant = 'primary' | 'secondary';
export type RadioLayout = 'auto' | 'item' | 'group' | 'list';
export type RadioOrientation = 'horizontal' | 'vertical';

export interface RadioOption {
  label: string;
  value: any;
  description?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ae-radio-group',
  standalone: true,
  imports: [CommonModule, forwardRef(() => RadioComponent)],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      role="radiogroup"
      [attr.aria-required]="required() ? 'true' : null"
      [class]="groupClasses()"
    >
      @if (options() && options()!.length > 0) {
        @for (opt of options()!; track opt.value) {
          <ae-radio
            [name]="computedName()"
            [value]="opt.value"
            [label]="opt.label"
            [description]="opt.description"
            [disabled]="disabled() || opt.disabled"
            [size]="size()"
            [variant]="variant()"
            [layout]="layout()"
            [checked]="selectedValue() === opt.value"
            (valueChange)="selectValue($event)"
          ></ae-radio>
        }
      } @else {
        <ng-content></ng-content>
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
export class RadioGroupComponent implements ControlValueAccessor {
  /**
   * Group input name
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Controlled value
   */
  readonly value = input<any>(undefined);

  /**
   * Data-driven options array
   */
  readonly options = input<RadioOption[] | undefined>(undefined);

  /**
   * Sizing scale: 'sm' | 'base' | 'lg'
   */
  readonly size = input<RadioSize>('base');

  /**
   * Theme variant: 'primary' | 'secondary'
   */
  readonly variant = input<RadioVariant>('primary');

  /**
   * Layout type: 'auto' | 'item' | 'group' | 'list'
   */
  readonly layout = input<RadioLayout>('auto');

  /**
   * Visual arrangement: 'horizontal' | 'vertical'
   */
  readonly orientation = input<RadioOrientation>('vertical');

  /**
   * Disabled state for entire group
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Required field indicator
   */
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when selected value changes
   */
  readonly valueChange = output<any>();
  readonly change = output<any>();

  private readonly internalValue = signal<any>(undefined);

  private readonly uniqueName = `aegov-rg-${Math.random().toString(36).substring(2, 9)}`;

  readonly computedName = computed(() => this.name() || this.uniqueName);
  readonly selectedValue = computed(() => this.internalValue());

  constructor() {
    effect(() => {
      const v = this.value();
      if (v !== undefined) {
        this.internalValue.set(v);
      }
    });
  }

  protected readonly groupClasses = computed<string>(() => {
    const ori = this.orientation();
    const l = this.layout();

    if (l === 'list') {
      return cn('divide-y divide-aeblack-100 sm:w-80', this.className());
    }

    if (ori === 'horizontal') {
      return cn('flex flex-wrap gap-6 items-center', this.className());
    }

    return cn('space-y-6', this.className());
  });

  selectValue(val: any): void {
    if (this.disabled()) return;
    this.internalValue.set(val);
    this.onChange(val);
    this.valueChange.emit(val);
    this.change.emit(val);
    this.onTouched();
  }

  // ControlValueAccessor
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: any): void {
    this.internalValue.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal
  }
}

@Component({
  selector: 'ae-radio',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.block]': 'isBlockLayout()',
    '[class.w-full]': 'isBlockLayout()',
    '[class.inline-block]': '!isBlockLayout()',
  },
  template: `
    <div [class]="containerClasses()">
      <!-- List Layout: Label on Left, Input on Right -->
      @if (effectiveLayout() === 'list') {
        <label
          [attr.for]="computedId()"
          [id]="computedId() + '-description'"
        >
          @if (label()) {
            {{ label() }}
          } @else {
            <ng-content></ng-content>
          }
          @if (effectiveRequired()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
        <input
          [id]="computedId()"
          type="radio"
          class="rounded-full"
          [name]="effectiveName()"
          [value]="value() ?? ''"
          [checked]="isChecked()"
          [disabled]="effectiveDisabled()"
          [required]="effectiveRequired()"
          [attr.aria-disabled]="effectiveDisabled() ? 'true' : null"
          [attr.aria-describedby]="description() ? computedId() + '-desc' : (computedId() + '-description')"
          (change)="onInputChange($event)"
          (blur)="onTouched()"
        />
      }

      <!-- Group Layout: Input on Left, Label + Description on Right -->
      @else if (effectiveLayout() === 'group') {
        <input
          [id]="computedId()"
          type="radio"
          class="rounded-full"
          [name]="effectiveName()"
          [value]="value() ?? ''"
          [checked]="isChecked()"
          [disabled]="effectiveDisabled()"
          [required]="effectiveRequired()"
          [attr.aria-disabled]="effectiveDisabled() ? 'true' : null"
          [attr.aria-describedby]="description() ? computedId() + '-desc' : null"
          (change)="onInputChange($event)"
          (blur)="onTouched()"
        />
        <div>
          <label [attr.for]="computedId()">
            @if (label()) {
              {{ label() }}
            } @else {
              <ng-content></ng-content>
            }
            @if (effectiveRequired()) {
              <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
            }
          </label>
          @if (description()) {
            <p [id]="computedId() + '-desc'">{{ description() }}</p>
          }
        </div>
      }

      <!-- Item Layout: Simple Standard Item -->
      @else {
        <input
          [id]="computedId()"
          type="radio"
          class="rounded-full"
          [name]="effectiveName()"
          [value]="value() ?? ''"
          [checked]="isChecked()"
          [disabled]="effectiveDisabled()"
          [required]="effectiveRequired()"
          [attr.aria-disabled]="effectiveDisabled() ? 'true' : null"
          (change)="onInputChange($event)"
          (blur)="onTouched()"
        />
        <label [attr.for]="computedId()">
          @if (label()) {
            {{ label() }}
          } @else {
            <ng-content></ng-content>
          }
          @if (effectiveRequired()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
      }
    </div>
  `,
  styles: [`
    :host([layout="list"]), :host([layout="group"]) {
      display: block;
      width: 100%;
    }
    input[type="radio"] {
      border-radius: 9999px !important;
    }
  `]
})
export class RadioComponent implements ControlValueAccessor {
  private readonly group = inject(RadioGroupComponent, { optional: true });

  /**
   * HTML ID for input and label pairing (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Form control name
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Value attribute for form submission
   */
  readonly value = input<any>(undefined);

  /**
   * Primary label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Accompanying helper description text
   */
  readonly description = input<string | undefined>(undefined);

  /**
   * Radio sizing scale ('sm' | 'base' | 'lg')
   */
  readonly size = input<RadioSize>('base');

  /**
   * Visual color variant ('primary' | 'secondary')
   */
  readonly variant = input<RadioVariant>('primary');

  /**
   * Layout style ('auto' | 'item' | 'group' | 'list')
   */
  readonly layout = input<RadioLayout>('auto');

  /**
   * Whether the radio is disabled
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether the radio is required
   */
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Initial or controlled checked state
   */
  readonly checked = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when checked state changes
   */
  readonly checkedChange = output<boolean>();
  readonly valueChange = output<any>();
  readonly change = output<Event>();

  protected readonly isChecked = signal<boolean>(false);

  private readonly uniqueId = `aegov-radio-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  constructor() {
    effect(() => {
      if (this.group && this.group.selectedValue() !== undefined) {
        this.isChecked.set(this.group.selectedValue() === this.value());
      } else {
        this.isChecked.set(this.checked());
      }
    });
  }

  protected readonly effectiveName = computed(() => this.name() || this.group?.computedName() || this.computedId());
  protected readonly effectiveDisabled = computed(() => this.disabled() || (this.group ? this.group.disabled() : false));
  protected readonly effectiveRequired = computed(() => this.required() || (this.group ? this.group.required() : false));
  protected readonly effectiveSize = computed(() => (this.group ? this.group.size() : this.size()));
  protected readonly effectiveVariant = computed(() => (this.group ? this.group.variant() : this.variant()));

  protected readonly effectiveLayout = computed<RadioLayout>(() => {
    const l = this.layout();
    if (l !== 'auto') return l;
    if (this.group && this.group.layout() !== 'auto') return this.group.layout();
    if (this.description()) return 'group';
    return 'item';
  });

  protected readonly isBlockLayout = computed(() => {
    const l = this.effectiveLayout();
    if (l === 'list' || l === 'group') return true;
    if (this.group && this.group.orientation() === 'horizontal') return false;
    if (this.group && this.group.orientation() === 'vertical') return true;
    return false;
  });

  protected readonly containerClasses = computed(() => {
    const l = this.effectiveLayout();
    const sz = this.effectiveSize();
    const v = this.effectiveVariant();

    return cn(
      l === 'item' && 'aegov-check-item',
      l === 'group' && 'aegov-check-group',
      l === 'list' && 'aegov-check-group group-list',
      v === 'secondary' && 'check-secondary',
      sz !== 'base' && `check-${sz}`,
      this.className()
    );
  });

  protected onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChk = target.checked;
    this.isChecked.set(isChk);
    const val = this.value();
    this.onChange(val !== undefined ? val : isChk);
    this.checkedChange.emit(isChk);
    this.valueChange.emit(val !== undefined ? val : isChk);
    if (this.group) {
      this.group.selectValue(val !== undefined ? val : isChk);
    }
    this.change.emit(event);
  }

  // ControlValueAccessor
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (this.value() !== undefined) {
      this.isChecked.set(value === this.value());
    } else {
      this.isChecked.set(!!value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal
  }
}
