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

export type CheckboxSize = 'sm' | 'base' | 'lg';
export type CheckboxVariant = 'primary' | 'secondary';
export type CheckboxLayout = 'auto' | 'item' | 'group' | 'list';

@Component({
  selector: 'ae-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()">
      @if (effectiveLayout() === 'list') {
        <label
          [attr.for]="computedId()"
          [id]="computedId() + '-label'"
        >
          @if (label()) {
            {{ label() }}
          } @else {
            <ng-content></ng-content>
          }
          @if (required()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
        <input
          [id]="computedId()"
          type="checkbox"
          [name]="name() || computedId()"
          [value]="value() ?? ''"
          [checked]="isChecked()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          [attr.aria-describedby]="description() ? computedId() + '-desc' : (computedId() + '-label')"
          (change)="onInputChange($event)"
          (blur)="onTouched()"
        />
      } @else if (effectiveLayout() === 'group') {
        <input
          [id]="computedId()"
          type="checkbox"
          [name]="name() || computedId()"
          [value]="value() ?? ''"
          [checked]="isChecked()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
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
            @if (required()) {
              <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
            }
          </label>
          @if (description()) {
            <p [id]="computedId() + '-desc'">{{ description() }}</p>
          }
        </div>
      } @else {
        <input
          [id]="computedId()"
          type="checkbox"
          [name]="name() || computedId()"
          [value]="value() ?? ''"
          [checked]="isChecked()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          (change)="onInputChange($event)"
          (blur)="onTouched()"
        />
        <label [attr.for]="computedId()">
          @if (label()) {
            {{ label() }}
          } @else {
            <ng-content></ng-content>
          }
          @if (required()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    :host([layout="list"]), :host-context(.divide-y), :host-context(.flex-col) {
      display: block;
      width: 100%;
    }
  `]
})
export class CheckboxComponent implements ControlValueAccessor {
  /**
   * HTML ID for the input and label pairing (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Form control name
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Value attribute for form submission
   */
  readonly value = input<string | number | undefined>(undefined);

  /**
   * Primary label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Accompanying helper description text
   */
  readonly description = input<string | undefined>(undefined);

  /**
   * Checkbox sizing scale ('sm' | 'base' | 'lg')
   */
  readonly size = input<CheckboxSize>('base');

  /**
   * Visual color variant ('primary' | 'secondary')
   */
  readonly variant = input<CheckboxVariant>('primary');

  /**
   * Layout style ('auto' | 'item' | 'group' | 'list')
   */
  readonly layout = input<CheckboxLayout>('auto');

  /**
   * Whether the checkbox is disabled
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether the checkbox is required
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
  readonly onCheckedChange = output<boolean>();
  readonly change = output<Event>();

  protected readonly isChecked = signal<boolean>(false);

  private readonly uniqueId = `aegov-chk-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  private prevCheckedInput: boolean | undefined = undefined;

  constructor() {
    effect(() => {
      const currentInput = this.checked();
      if (this.prevCheckedInput === undefined) {
        this.prevCheckedInput = currentInput;
        this.isChecked.set(currentInput);
      } else if (currentInput !== this.prevCheckedInput) {
        this.prevCheckedInput = currentInput;
        this.isChecked.set(currentInput);
      }
    });
  }

  protected readonly effectiveLayout = computed(() => {
    if (this.layout() !== 'auto') return this.layout();
    if (this.description()) return 'group';
    return 'item';
  });

  protected readonly containerClasses = computed(() => {
    const l = this.effectiveLayout();
    return cn(
      l === 'item' && 'aegov-check-item',
      l === 'group' && 'aegov-check-group',
      l === 'list' && 'aegov-check-group group-list',
      this.variant() === 'secondary' && 'check-secondary',
      this.size() !== 'base' && `check-${this.size()}`,
      this.className()
    );
  });

  protected onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChk = target.checked;
    this.prevCheckedInput = isChk;
    this.isChecked.set(isChk);
    this.onChange(isChk);
    this.checkedChange.emit(isChk);
    this.onCheckedChange.emit(isChk);
    this.change.emit(event);
  }

  // ControlValueAccessor methods
  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    const isChk = !!value;
    this.prevCheckedInput = isChk;
    this.isChecked.set(isChk);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via Angular input signal
  }
}
