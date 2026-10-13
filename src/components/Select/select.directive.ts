import {
  Directive,
  input,
  computed,
  inject,
  ElementRef,
  Renderer2,
  effect,
  untracked,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/**
 * Select directive that styles native `<select>` elements for the UAE Government Design System.
 * Can be used with standard child `<option>` tags or data-driven via `[options]` and `[placeholder]`.
 *
 * @example Data-driven:
 * ```html
 * <div aeFormControl>
 *   <label for="emirate">Emirate</label>
 *   <div class="form-control-input">
 *     <select aeSelect id="emirate" [options]="emirateOptions" placeholder="Select an emirate"></select>
 *   </div>
 * </div>
 * ```
 *
 * @example Declarative HTML:
 * ```html
 * <div aeFormControl>
 *   <label for="emirate">Emirate</label>
 *   <div class="form-control-input">
 *     <select aeSelect id="emirate">
 *       <option value="auh">Abu Dhabi</option>
 *       <option value="dxb">Dubai</option>
 *     </select>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: 'select[aeSelect], [aeSelect]',
  standalone: true,
  host: {
    '[class]': 'selectClasses()',
  },
})
export class SelectDirective {
  private readonly el = inject(ElementRef<HTMLSelectElement>);
  private readonly renderer = inject(Renderer2);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  /** Optional data-driven options list */
  readonly options = input<(SelectOption | string)[] | undefined>(undefined);
  /** Optional placeholder text displayed as the default disabled option */
  readonly placeholder = input<string | undefined>(undefined);
  readonly className = input<string>('', { alias: 'class' });
  // Cache normalized options to prevent unnecessary DOM manipulation
  private prevOptions: SelectOption[] = [];
  private prevPlaceholder: string | undefined = undefined;
  constructor() {
    effect(() => {
      const rawOpts = this.options();
      const ph = this.placeholder();
      if (rawOpts === undefined) {
        return;
      }
      // 1. Normalize options to SelectOption[]
      const normalized: SelectOption[] = rawOpts.map((item) =>
        typeof item === 'string' ? { value: item, label: item } : item
      );
      // 2. Fast shallow check to avoid DOM work if values/labels haven't changed
      if (!this.hasOptionsChanged(normalized, ph)) {
        return;
      }
      this.prevOptions = normalized;
      this.prevPlaceholder = ph;
      // 3. Render safely untracked
      untracked(() => this.renderOptions(normalized, ph));
    });
  }
  protected readonly selectClasses = computed(() => {
    return cn(
      'w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none rounded-lg appearance-none bg-[right_1rem_center] rtl:bg-[left_1rem_center] bg-no-repeat pe-10 ps-4',
      this.className()
    );
  });
  /**
   * Fast shallow comparison of options and placeholder (replaces expensive JSON.stringify)
   */
  private hasOptionsChanged(next: SelectOption[], nextPh?: string): boolean {
    if (nextPh !== this.prevPlaceholder) return true;
    if (next.length !== this.prevOptions.length) return true;
    for (let i = 0; i < next.length; i++) {
      const a = next[i];
      const b = this.prevOptions[i];
      if (a.value !== b.value || a.label !== b.label || a.disabled !== b.disabled) {
        return true;
      }
    }
    return false;
  }
  /**
   * Rebuilds options using a DocumentFragment to avoid intermediate browser reflows
   */
  private renderOptions(options: SelectOption[], placeholderText?: string): void {
    const select = this.el.nativeElement;
    if (!select) return;
    // Get current control value (if reactive form control attached)
    const currentControlValue =
      this.ngControl?.value != null ? String(this.ngControl.value) : (select.value || null);
    // Build off-DOM in a DocumentFragment for maximum performance
    const fragment = document.createDocumentFragment();
    if (placeholderText) {
      const placeholderOpt = this.renderer.createElement('option');
      this.renderer.setProperty(placeholderOpt, 'value', '');
      this.renderer.setProperty(placeholderOpt, 'textContent', placeholderText);
      this.renderer.setProperty(placeholderOpt, 'disabled', true);
      this.renderer.setProperty(placeholderOpt, 'hidden', true);
      if (!currentControlValue) {
        this.renderer.setProperty(placeholderOpt, 'selected', true);
      }
      fragment.appendChild(placeholderOpt);
    }
    for (const opt of options) {
      const optEl = this.renderer.createElement('option');
      const optValue = String(opt.value);
      this.renderer.setProperty(optEl, 'value', optValue);
      this.renderer.setProperty(optEl, 'textContent', opt.label);
      if (opt.disabled) {
        this.renderer.setProperty(optEl, 'disabled', true);
      }
      if (currentControlValue != null && optValue === currentControlValue) {
        this.renderer.setProperty(optEl, 'selected', true);
      }
      fragment.appendChild(optEl);
    }
    // Single DOM update: replace all children at once
    select.replaceChildren(fragment);
    // Re-sync value if needed without triggering control changes
    if (currentControlValue != null && select.value !== currentControlValue) {
      select.value = currentControlValue;
    }
  }
}
