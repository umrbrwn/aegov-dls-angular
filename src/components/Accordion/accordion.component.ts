import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  inject,
  forwardRef,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective, type IconName } from '../Icon/icon.directive';

export interface AccordionItemData {
  value: string;
  title: string;
  content?: string;
  icon?: IconName;
  iconRotateDeg?: number;
}

@Component({
  selector: 'ae-accordion-item',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion-item" [class.border-none!]="borderNone()">
      <div class="accordion-title" [id]="'aegov-accordion-head-' + value()">
        <button
          type="button"
          [class.accordion-active]="isOpen()"
          [class.accordion-inactive]="!isOpen()"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-controls]="'aegov-accordion-body-' + value()"
          (click)="toggle()"
        >
          <span>{{ title() }}</span>
          <svg
            aeIcon
            [name]="effectiveIcon()"
            [size]="20"
            [style.transform]="isOpen() ? 'rotate(' + effectiveRotateDeg() + 'deg)' : 'rotate(0deg)'"
            [style.transition]="'transform 0.2s ease'"
          ></svg>
        </button>
      </div>
      <div
        class="accordion-content"
        [class.hidden]="!isOpen()"
        [id]="'aegov-accordion-body-' + value()"
        [attr.aria-labelledby]="'aegov-accordion-head-' + value()"
      >
        <div class="accordion-content-body">
          @if (content()) {
            <p>{{ content() }}</p>
          } @else {
            <ng-content></ng-content>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AccordionItemComponent {
  private readonly parentAccordion = inject(forwardRef(() => AccordionComponent), { optional: true });

  /** Unique item identifier used to track expansion state */
  readonly value = input.required<string>();

  /** Header title text rendered on the item trigger button */
  readonly title = input<string>('');

  /** Text content for simple items. Alternatively, project custom content via `<ng-content>` */
  readonly content = input<string | undefined>(undefined);

  /** Custom trigger icon for this item (falls back to parent accordion icon or 'caret-down') */
  readonly icon = input<IconName | undefined>(undefined);

  /** Rotation angle in degrees for the icon when expanded (defaults to parent accordion setting) */
  readonly iconRotateDeg = input<number | undefined>(undefined);

  /** Whether to omit the bottom border (useful for nested accordions or last items) */
  readonly borderNone = input<boolean, unknown>(false, { transform: booleanAttribute });

  protected readonly internalOpen = signal<boolean>(false);

  protected readonly isOpen = computed(() => {
    if (this.parentAccordion) {
      return this.parentAccordion.isItemOpen(this.value());
    }
    return this.internalOpen();
  });

  protected readonly effectiveIcon = computed<IconName>(() => {
    return this.icon() || this.parentAccordion?.icon() || 'caret-down';
  });

  protected readonly effectiveRotateDeg = computed<number>(() => {
    return this.iconRotateDeg() ?? this.parentAccordion?.iconRotateDeg() ?? 180;
  });

  toggle(): void {
    if (this.parentAccordion) {
      this.parentAccordion.toggleItem(this.value());
    } else {
      this.internalOpen.update(prev => !prev);
    }
  }
}

@Component({
  selector: 'ae-accordion',
  standalone: true,
  imports: [CommonModule, IconDirective, AccordionItemComponent],
  template: `
    <div class="aegov-accordion" role="region">
      @if (items().length > 0) {
        @for (item of items(); track item.value; let isLast = $last) {
          <div class="accordion-item" [class.border-none!]="isNested() && isLast">
            <div class="accordion-title" [id]="'aegov-accordion-head-' + item.value">
              <button
                type="button"
                [class.accordion-active]="isItemOpen(item.value)"
                [class.accordion-inactive]="!isItemOpen(item.value)"
                [attr.aria-expanded]="isItemOpen(item.value)"
                [attr.aria-controls]="'aegov-accordion-body-' + item.value"
                (click)="toggleItem(item.value)"
              >
                <span>{{ item.title }}</span>
                <svg
                  aeIcon
                  [name]="item.icon || icon()"
                  [size]="20"
                  [style.transform]="isItemOpen(item.value) ? 'rotate(' + (item.iconRotateDeg ?? iconRotateDeg()) + 'deg)' : 'rotate(0deg)'"
                  [style.transition]="'transform 0.2s ease'"
                ></svg>
              </button>
            </div>
            <div
              class="accordion-content"
              [class.hidden]="!isItemOpen(item.value)"
              [id]="'aegov-accordion-body-' + item.value"
              [attr.aria-labelledby]="'aegov-accordion-head-' + item.value"
            >
              <div class="accordion-content-body">
                @if (item.content) {
                  <p>{{ item.content }}</p>
                }
              </div>
            </div>
          </div>
        }
      } @else {
        <ng-content></ng-content>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class AccordionComponent {
  private readonly parentAccordion = inject(forwardRef(() => AccordionComponent), { optional: true, skipSelf: true });
  private readonly parentItem = inject(forwardRef(() => AccordionItemComponent), { optional: true });

  protected readonly isNested = computed(() => !!this.parentAccordion || !!this.parentItem);

  /**
   * Data-driven items for the accordion
   */
  readonly items = input<AccordionItemData[]>([]);

  /**
   * Whether multiple panels can be open concurrently
   */
  readonly multiple = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether all panels can be collapsed
   */
  readonly collapsible = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Default opened item value(s)
   */
  readonly defaultValue = input<string | string[] | undefined>(undefined);

  /**
   * Default icon for panels (defaults to 'caret-down')
   */
  readonly icon = input<IconName>('caret-down');

  /**
   * Degrees to rotate icon when active (defaults to 180 for caret-down, 45 for plus)
   */
  readonly iconRotateDeg = input<number>(180);

  /**
   * Emitted when open panels change
   */
  readonly valueChange = output<string | string[]>();
  readonly onValueChange = output<string | string[]>();

  private readonly openValues = signal<string[]>([]);

  constructor() {
    effect(() => {
      const def = this.defaultValue();
      if (def !== undefined && def !== null) {
        this.openValues.set(Array.isArray(def) ? def : [def]);
      }
    });

    effect(() => {
      const isMulti = this.multiple();
      const current = this.openValues();
      if (!isMulti && current.length > 1) {
        this.openValues.set([current[0]]);
      }
    });
  }

  isItemOpen(val: string): boolean {
    return this.openValues().includes(val);
  }

  toggleItem(val: string): void {
    const current = this.openValues();
    const isOpen = current.includes(val);
    let next: string[];

    if (isOpen) {
      if (this.collapsible()) {
        next = current.filter(v => v !== val);
      } else {
        if (this.multiple() && current.length > 1) {
          next = current.filter(v => v !== val);
        } else {
          next = current;
        }
      }
    } else {
      if (this.multiple()) {
        next = [...current, val];
      } else {
        next = [val];
      }
    }

    this.openValues.set(next);
    const emitted = this.multiple() ? next : (next[0] || '');
    this.valueChange.emit(emitted);
    this.onValueChange.emit(emitted);
  }
}
