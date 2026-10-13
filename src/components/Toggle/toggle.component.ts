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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../utils/cn';

export type ToggleVariant = 'default' | 'primary' | 'success' | 'mode' | 'secondary';

@Component({
  selector: 'ae-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      <input
        type="checkbox"
        class="sr-only peer"
        role="switch"
        [id]="computedId()"
        [name]="name() || computedId()"
        [value]="value() || ''"
        [checked]="internalChecked()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-checked]="internalChecked() ? 'true' : 'false'"
        [attr.aria-disabled]="disabled() ? 'true' : null"
        (change)="onInputChange($event)"
        (blur)="onInputBlur()"
      />
      <span class="toggle-item" [class.toggle-icon]="withIcon()"></span>

      @if (label()) {
        <span class="toggle-text">
          {{ label() }}
          @if (required()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </span>
      } @else if (srOnlyLabel()) {
        <span class="sr-only">{{ srOnlyLabel() }}</span>
      } @else {
        <span class="sr-only">Enable</span>
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
  /**
   * HTML ID attribute (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * HTML name attribute
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * HTML value attribute
   */
  readonly value = input<string | undefined>(undefined);

  /**
   * Visual variant: 'default' | 'primary' | 'success' | 'mode' | 'secondary'
   */
  readonly variant = input<ToggleVariant>('default');

  /**
   * Controlled or initial checked state
   */
  readonly checked = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Visible text label accompanying the toggle switch
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Visually hidden text label for screen readers when no visible label is provided
   */
  readonly srOnlyLabel = input<string | undefined>(undefined);

  /**
   * Displays an icon inside the toggle thumb that changes on state switch
   */
  readonly withIcon = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Disables toggle interaction
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
   * Event emitted when checked state changes
   */
  readonly checkedChange = output<boolean>();

  /**
   * Event emitted on change
   */
  readonly change = output<Event>();

  protected readonly internalChecked = signal<boolean>(false);

  private readonly uniqueId = `toggle-switch-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  private prevCheckedInput: boolean | undefined = undefined;

  constructor() {
    effect(() => {
      const currentInput = this.checked();
      if (this.prevCheckedInput === undefined) {
        this.prevCheckedInput = currentInput;
        this.internalChecked.set(currentInput);
      } else if (currentInput !== this.prevCheckedInput) {
        this.prevCheckedInput = currentInput;
        this.internalChecked.set(currentInput);
      }
    });
  }

  protected readonly wrapperClasses = computed(() => {
    const v = this.variant();
    return cn(
      'aegov-toggle',
      v === 'success' && 'toggle-success',
      v === 'mode' && 'toggle-mode',
      v === 'secondary' && 'toggle-secondary',
      this.className()
    );
  });

  protected onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    this.prevCheckedInput = isChecked;
    this.internalChecked.set(isChecked);
    this.onChange(isChecked);
    this.checkedChange.emit(isChecked);
    this.change.emit(event);
  }

  protected onInputBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: any): void {
    const isChecked = !!val;
    this.prevCheckedInput = isChecked;
    this.internalChecked.set(isChecked);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via Angular input signal
  }
}
