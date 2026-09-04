import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent, type IconName } from '../Icon/icon.component';

export type TabsVariant = 'default' | 'pills' | 'compact';

export interface TabItem {
  value: string;
  label: string;
  content?: string;
  icon?: IconName;
}

@Component({
  selector: 'ae-tabs',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="rootClasses()">
      <!-- Tabs Navigation List -->
      <div [class]="listClasses()" role="tablist">
        @for (item of items(); track item.value) {
          <button
            type="button"
            role="tab"
            [id]="'tab-' + item.value"
            [attr.aria-selected]="currentTab() === item.value"
            [attr.aria-controls]="'panel-' + item.value"
            [class]="triggerClasses(item.value)"
            (click)="selectTab(item.value)"
          >
            <div class="flex items-center gap-2">
              @if (item.icon) {
                <ae-icon [name]="item.icon" [size]="20"></ae-icon>
              }
              <span class="whitespace-nowrap">{{ item.label }}</span>
            </div>
          </button>
        }
      </div>

      <!-- Tab Panels Content -->
      @for (item of items(); track item.value) {
        @if (currentTab() === item.value) {
          <div
            role="tabpanel"
            [id]="'panel-' + item.value"
            [attr.aria-labelledby]="'tab-' + item.value"
            [class]="contentClasses()"
          >
            @if (item.content) {
              <div>{{ item.content }}</div>
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
  readonly variant = input<TabsVariant>('default');
  readonly items = input<TabItem[]>([]);
  readonly defaultValue = input<string | undefined>(undefined);
  readonly class = input<string>('');

  readonly tabChange = output<string>();

  readonly activeTab = signal<string>('');

  readonly effectiveVariant = computed<TabsVariant>(() => this.variant() || 'default');

  readonly currentTab = computed(() => {
    const active = this.activeTab();
    if (active) return active;
    const def = this.defaultValue();
    if (def) return def;
    const list = this.items();
    return list.length > 0 ? list[0].value : '';
  });

  readonly rootClasses = computed(() =>
    cn('w-full', this.class())
  );

  readonly listClasses = computed(() =>
    cn(
      'flex gap-4 md:gap-6 lg:gap-7 xl:gap-8 -mb-px',
      this.effectiveVariant() !== 'pills' && 'border-b-2 border-gray-200'
    )
  );

  triggerClasses(tabValue: string): string {
    const isActive = this.currentTab() === tabValue;
    const v = this.effectiveVariant();

    const base = 'items-center gap-3 font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0 cursor-pointer';

    const variantStyles = {
      default: cn(
        'py-6 px-1 text-base border-b-[3px] border-transparent hover:text-gray-950 hover:border-primary-500 rounded-t-lg',
        isActive && 'text-primary-600 border-primary-500 font-semibold'
      ),
      pills: cn(
        'py-3 px-4 lg:px-6 text-base rounded-lg hover:bg-aeblack-50',
        isActive && 'bg-primary-100 text-primary-900 font-semibold'
      ),
      compact: cn(
        'py-4 px-1 text-sm border-b-[3px] border-transparent hover:text-gray-950 hover:border-primary-500 rounded-t-lg',
        isActive && 'text-primary-600 border-primary-500 font-semibold'
      )
    };

    return cn(base, variantStyles[v]);
  }

  readonly contentClasses = computed(() => {
    return cn(
      'p-4 pt-6 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0'
    );
  });

  selectTab(val: string): void {
    this.activeTab.set(val);
    this.tabChange.emit(val);
  }
}
