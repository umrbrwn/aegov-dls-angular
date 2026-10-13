import {
  Component,
  input,
  output,
  linkedSignal,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconDirective, type IconName } from '../Icon/icon.directive';

export type TabsVariant = 'default' | 'compact' | 'pills';

export interface TabItem {
  /** Unique identifier for this tab */
  value: string;
  /** Display label text */
  label: string;
  /** Optional tab content (plain text) */
  content?: string;
  /** Optional icon name (rendered via svg aeIcon) */
  icon?: IconName;
}

@Component({
  selector: 'ae-tabs',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Tab Navigation -->
    <div [class]="wrapperClasses()">
      <ul
        class="tab-items gap-4 md:gap-6 lg:gap-7 xl:gap-8 max-xl:overflow-auto"
        role="tablist"
      >
        @for (item of items(); track item.value) {
          <li role="presentation">
            <a
              href="#"
              role="tab"
              class="tab-link whitespace-nowrap"
              [class.tab-active]="currentTab() === item.value"
              [class.h-10]="variant() === 'pills'"
              [class.lg:h-12]="variant() === 'pills'"
              [class.px-4]="variant() === 'pills'"
              [class.lg:px-6]="variant() === 'pills'"
              [id]="'tab-' + computedId() + '-' + item.value"
              [attr.aria-selected]="currentTab() === item.value"
              [attr.aria-controls]="'panel-' + computedId() + '-' + item.value"
              (click)="selectTab($event, item.value)"
            >
              @if (item.icon) {
                <svg aeIcon [name]="item.icon" [size]="iconSize()"></svg>
              }
              {{ item.label }}
            </a>
          </li>
        }
      </ul>
    </div>

    <!-- Tab Content Panels -->
    <div class="py-4">
      @for (item of items(); track item.value) {
        @if (currentTab() === item.value) {
          <div
            class="tab-content"
            role="tabpanel"
            [id]="'panel-' + computedId() + '-' + item.value"
            [attr.aria-labelledby]="'tab-' + computedId() + '-' + item.value"
          >
            @if (item.content) {
              <p>{{ item.content }}</p>
            } @else {
              <ng-content></ng-content>
            }
          </div>
        }
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
export class TabsComponent {
  /**
   * HTML ID for the tabs component
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Array of tab items defining label, value, optional content and icon
   */
  readonly items = input<TabItem[]>([]);

  /**
   * Visual variant: 'default' | 'compact' | 'pills'
   */
  readonly variant = input<TabsVariant>('default');

  /**
   * Initial active tab value (defaults to the first tab)
   */
  readonly defaultValue = input<string | undefined>(undefined);

  /**
   * Additional CSS classes forwarded to the root wrapper
   */
  readonly className = input<string>('');

  /** Emits the value of the selected tab */
  readonly tabChange = output<string>();

  /** Internal active tab state tracking defaultValue and user selections */
  protected readonly activeTab = linkedSignal(() => {
    const def = this.defaultValue();
    if (def) return def;
    const list = this.items();
    return list.length > 0 ? list[0].value : '';
  });

  private readonly uniqueId = `tabs-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  protected readonly currentTab = computed(() => this.activeTab());

  protected readonly iconSize = computed(() => {
    return this.variant() === 'compact' ? 18 : 20;
  });

  protected readonly wrapperClasses = computed(() => {
    const v = this.variant();
    return cn(
      'aegov-tab',
      v === 'compact' && 'tab-sm',
      v === 'pills' && 'tab-pills',
      this.className()
    );
  });

  protected selectTab(event: Event, value: string): void {
    event.preventDefault();
    this.activeTab.set(value);
    this.tabChange.emit(value);
  }
}
