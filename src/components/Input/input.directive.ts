import {
  Directive,
  input,
  computed,
  booleanAttribute,
  ElementRef,
  inject,
  AfterContentInit,
  OnDestroy,
  effect,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '../../utils/cn';

export type InputSize = 'sm' | 'base' | 'lg';
export type InputVariant = 'primary' | 'secondary';

/**
 * Directive applied to the outer `.aegov-form-control` wrapper.
 * Automatically wires accessible relationships (id <-> label for, aria-describedby, aria-invalid)
 * non-destructively without requiring manual boilerplate from the developer.
 *
 * @example
 * ```html
 * <div aeFormControl [error]="hasError()">
 *   <label>Email</label>
 *   <div class="form-control-input">
 *     <input aeInput type="email" [formControl]="emailCtrl" />
 *   </div>
 *   @if (hasError()) {
 *     <p class="error-message">Invalid email address</p>
 *   }
 * </div>
 * ```
 */
@Directive({
  selector: 'div[aeFormControl], [aeFormControl]',
  standalone: true,
  host: {
    '[class]': 'formControlClasses()',
  },
})
export class FormControlDirective implements AfterContentInit, OnDestroy {
  readonly size = input<InputSize>('base');
  readonly variant = input<InputVariant>('primary');
  readonly error = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly className = input<string>('', { alias: 'class' });

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly uniqueId = `aegov-ctrl-${Math.random().toString(36).substring(2, 9)}`;

  private mutationObserver: MutationObserver | null = null;
  private autoAssignedControlId: string | null = null;
  private autoAssignedErrorId: string | null = null;
  private autoAssignedHelperId: string | null = null;

  constructor() {
    effect(() => {
      // Re-run ARIA sync whenever error() changes
      const isErr = this.error();
      if (this.isBrowser) {
        // Small microtask to allow Angular templates (@if) to render/destroy DOM nodes
        queueMicrotask(() => this.syncAccessibility(isErr));
      }
    });
  }

  ngAfterContentInit(): void {
    if (this.isBrowser) {
      this.syncAccessibility(this.error());
      this.setupMutationObserver();
    }
  }

  private setupMutationObserver(): void {
    if (typeof MutationObserver === 'undefined') return;

    this.mutationObserver = new MutationObserver(() => {
      this.syncAccessibility(this.error());
    });

    this.mutationObserver.observe(this.el.nativeElement, {
      childList: true,
      subtree: false,
    });
  }

  /**
   * Non-destructively syncs label-for, control-id, aria-invalid, and aria-describedby.
   */
  private syncAccessibility(isError: boolean): void {
    const root = this.el.nativeElement;
    const control = root.querySelector(
      'input, select, textarea'
    ) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null);
    if (!control) return;

    // 1. Ensure control has an ID
    if (!control.id) {
      control.id = this.uniqueId;
      this.autoAssignedControlId = this.uniqueId;
    }

    // 2. Ensure label has matching 'for' attribute
    const label = root.querySelector('label');
    if (label && label.getAttribute('for') !== control.id) {
      label.setAttribute('for', control.id);
    }

    // 3. Sync aria-invalid
    const currentAriaInvalid = control.getAttribute('aria-invalid');
    if (isError) {
      if (currentAriaInvalid !== 'true') {
        control.setAttribute('aria-invalid', 'true');
      }
    } else {
      if (currentAriaInvalid === 'true') {
        control.removeAttribute('aria-invalid');
      }
    }

    // 4. Sync aria-describedby (Errors & Helper texts)
    const errorEl = root.querySelector('.error-message, [role="alert"]');
    const helperEl = root.querySelector('.helper-text, .form-text, p:not(.error-message):not([role="alert"])');

    const describedIds: string[] = [];

    // Get any developer-assigned IDs from aria-describedby
    const existingDescribedBy = (control.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== this.autoAssignedErrorId && id !== this.autoAssignedHelperId);

    describedIds.push(...existingDescribedBy);

    if (errorEl && isError) {
      if (!errorEl.id) {
        errorEl.id = `${control.id}-err`;
        this.autoAssignedErrorId = errorEl.id;
      }
      if (!describedIds.includes(errorEl.id)) {
        describedIds.push(errorEl.id);
      }
    }

    if (helperEl && !isError) {
      // Only wire helper text when not in error state
      if (!helperEl.id) {
        helperEl.id = `${control.id}-desc`;
        this.autoAssignedHelperId = helperEl.id;
      }
      if (!describedIds.includes(helperEl.id)) {
        describedIds.push(helperEl.id);
      }
    }

    const currentDescribedBy = control.getAttribute('aria-describedby') || '';
    if (describedIds.length > 0) {
      const newDescribedBy = describedIds.join(' ');
      if (currentDescribedBy !== newDescribedBy) {
        control.setAttribute('aria-describedby', newDescribedBy);
      }
    } else if (currentDescribedBy) {
      control.removeAttribute('aria-describedby');
    }
  }

  ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  protected readonly formControlClasses = computed(() => {
    return cn(
      'aegov-form-control',
      this.size() === 'sm' && 'control-sm',
      this.size() === 'lg' && 'control-lg',
      this.variant() === 'secondary' && 'control-secondary',
      this.error() && 'control-error',
      this.className()
    );
  });
}

/**
 * Input directive that styles native `<input>` elements for the UAE Government Design System.
 *
 * @example
 * ```html
 * <input aeInput type="text" placeholder="Enter full name" />
 * ```
 */
@Directive({
  selector: 'input[aeInput], [aeInput]',
  standalone: true,
  host: {
    '[class]': 'inputClasses()',
  },
})
export class InputDirective {
  readonly className = input<string>('', { alias: 'class' });

  protected readonly inputClasses = computed(() => {
    return cn(
      'w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none',
      this.className()
    );
  });
}
