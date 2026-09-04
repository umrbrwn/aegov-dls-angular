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
import { cn } from '../../utils/cn';
import { IconComponent, type IconName } from '../Icon/icon.component';

export interface AccordionItemData {
  value: string;
  title: string;
  children?: string;
  icon?: IconName;
  iconRotateDeg?: number;
}

@Component({
  selector: 'ae-accordion-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border-b border-gray-200 [.accordion-wrapper_&:last-child]:border-0">
      <div class="w-full">
        <button
          type="button"
          [attr.aria-expanded]="isOpen()"
          class="group flex w-full items-center justify-between pe-3 ps-3 pb-5 pt-5 text-left text-base font-semibold text-gray-900 aria-expanded:text-aegold-600 hover:text-aegold-600 focus:text-aegold-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-400 hover:transition-colors duration-150 cursor-pointer"
          (click)="toggle()"
        >
          <span>{{ title() }}</span>
          <ae-icon
            [name]="icon()"
            [size]="20"
            weight="bold"
            class="shrink-0 text-gray-500 transition-transform duration-200 group-hover:text-primary-600"
            [style.transform]="isOpen() ? 'rotate(' + iconRotateDeg() + 'deg)' : 'rotate(0deg)'"
          ></ae-icon>
        </button>
      </div>
      @if (isOpen()) {
        <div class="accordion-content overflow-hidden animate-fadeIn">
          <div class="pb-5 pt-5 ps-3 pe-3 text-gray-700 [&_.accordion-wrapper]:px-4">
            @if (children()) {
              {{ children() }}
            } @else {
              <ng-content></ng-content>
            }
          </div>
        </div>
      }
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

  readonly value = input.required<string>();
  readonly title = input.required<string>();
  readonly children = input<string | undefined>(undefined);
  readonly icon = input<IconName>('caret-down');
  readonly iconRotateDeg = input<number>(180);

  private readonly internalOpen = signal<boolean>(false);

  readonly isOpen = computed(() => {
    if (this.parentAccordion) {
      return this.parentAccordion.isItemOpen(this.value());
    }
    return this.internalOpen();
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
  imports: [CommonModule, IconComponent, AccordionItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      @if (items().length > 0) {
        @for (item of items(); track item.value) {
          <div class="border-b border-gray-200 [.accordion-wrapper_&:last-child]:border-0">
            <div class="w-full">
              <button
                type="button"
                [attr.aria-expanded]="isItemOpen(item.value)"
                class="group flex w-full items-center justify-between pe-3 ps-3 pb-5 pt-5 text-left text-base font-semibold text-gray-900 aria-expanded:text-aegold-600 hover:text-aegold-600 focus:text-aegold-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-400 hover:transition-colors duration-150 cursor-pointer"
                (click)="toggleItem(item.value)"
              >
                <span>{{ item.title }}</span>
                <ae-icon
                  [name]="item.icon || 'caret-down'"
                  [size]="20"
                  weight="bold"
                  class="shrink-0 text-gray-500 transition-transform duration-200 group-hover:text-primary-600"
                  [style.transform]="isItemOpen(item.value) ? 'rotate(' + (item.iconRotateDeg ?? 180) + 'deg)' : 'rotate(0deg)'"
                ></ae-icon>
              </button>
            </div>
            @if (isItemOpen(item.value)) {
              <div class="overflow-hidden animate-fadeIn">
                <div class="pb-5 pt-5 ps-3 pe-3 text-gray-700 [&_.accordion-wrapper]:px-4">
                  {{ item.children }}
                </div>
              </div>
            }
          </div>
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
export class AccordionComponent {
  readonly items = input<AccordionItemData[]>([]);
  readonly multiple = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly collapsible = input<boolean, unknown>(true, { transform: booleanAttribute });
  readonly defaultValue = input<string | string[] | undefined>(undefined);
  readonly class = input<string>('');

  readonly valueChange = output<string | string[]>();
  readonly onValueChange = output<string | string[]>();

  readonly openValues = signal<string[]>([]);

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

  readonly wrapperClasses = computed(() => cn('accordion-wrapper w-full', this.class()));

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
