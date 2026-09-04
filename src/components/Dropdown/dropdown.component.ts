import {
  Component,
  input,
  output,
  signal,
  computed,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent, type IconName } from '../Icon/icon.component';

export interface DropdownItemData {
  label: string;
  value: string;
  icon?: IconName;
  disabled?: boolean;
}

export interface DropdownGroupData {
  label?: string;
  items: DropdownItemData[];
}

export type DropdownAlign = 'start' | 'center' | 'end';
export type DropdownSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'ae-dropdown',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-block"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div (click)="onTriggerClick()">
        <ng-content select="[trigger], [slot=trigger]"></ng-content>
      </div>

      @if (isOpen()) {
        <div
          [class]="menuClasses()"
          role="menu"
        >
          @if (header()) {
            <div class="px-4 py-3 border-b border-gray-100 mb-1 text-sm font-semibold text-gray-900">
              {{ header() }}
            </div>
          }

          @if (groups().length > 0) {
            @for (group of groups(); track $index; let groupIdx = $index) {
              <div>
                @if (group.label) {
                  <div class="px-3 py-2 text-xs font-medium text-gray-500 rtl:text-right">
                    {{ group.label }}
                  </div>
                }

                @for (item of group.items; track item.value) {
                  <button
                    type="button"
                    role="menuitem"
                    [disabled]="item.disabled"
                    [class]="itemClasses(item)"
                    (click)="onItemSelect(item.value)"
                  >
                    @if (item.icon) {
                      <ae-icon [name]="item.icon" [size]="16"></ae-icon>
                    }
                    <span class="flex-1 text-left rtl:text-right">{{ item.label }}</span>
                  </button>
                }

                @if (groupIdx < groups().length - 1) {
                  <div class="my-1 h-px bg-gray-100"></div>
                }
              </div>
            }
          } @else {
            <ng-content select="[dropdown-content], [slot=content]"></ng-content>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class DropdownComponent {
  readonly groups = input<DropdownGroupData[]>([]);
  readonly header = input<string | undefined>(undefined);
  readonly align = input<DropdownAlign>('start');
  readonly side = input<DropdownSide>('bottom');
  readonly trigger = input<'click' | 'hover'>('click');
  readonly class = input<string>('');

  readonly select = output<string>();

  readonly isOpen = signal<boolean>(false);
  private hoverTimeout: any = null;

  readonly effectiveAlign = computed<DropdownAlign>(() => this.align() || 'start');
  readonly effectiveSide = computed<DropdownSide>(() => this.side() || 'bottom');
  readonly effectiveTrigger = computed<'click' | 'hover'>(() => this.trigger() || 'click');

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.effectiveTrigger() === 'click' && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  readonly menuClasses = computed(() => {
    const s = this.effectiveSide();
    const a = this.effectiveAlign();

    let sideClass = '';
    let alignClass = '';

    if (s === 'bottom') {
      sideClass = 'top-full mt-1.5';
      alignClass = a === 'center' ? 'left-1/2 -translate-x-1/2' : a === 'end' ? 'right-0 rtl:left-0 rtl:right-auto' : 'left-0 rtl:right-0 rtl:left-auto';
    } else if (s === 'top') {
      sideClass = 'bottom-full mb-1.5';
      alignClass = a === 'center' ? 'left-1/2 -translate-x-1/2' : a === 'end' ? 'right-0 rtl:left-0 rtl:right-auto' : 'left-0 rtl:right-0 rtl:left-auto';
    } else if (s === 'left') {
      sideClass = 'right-full mr-1.5';
      alignClass = a === 'center' ? 'top-1/2 -translate-y-1/2' : a === 'end' ? 'bottom-0' : 'top-0';
    } else if (s === 'right') {
      sideClass = 'left-full ml-1.5';
      alignClass = a === 'center' ? 'top-1/2 -translate-y-1/2' : a === 'end' ? 'bottom-0' : 'top-0';
    }

    return cn(
      'absolute z-50 min-w-[240px] max-h-60 overflow-y-auto rounded-lg bg-white border border-gray-200 p-1 shadow-xl animate-fadeIn',
      sideClass,
      alignClass,
      this.class()
    );
  });

  itemClasses(item: DropdownItemData): string {
    return cn(
      'w-full relative flex items-center gap-3 px-3 py-2 text-sm text-gray-700 outline-hidden transition-colors rounded-md cursor-pointer',
      'hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900',
      item.disabled && 'pointer-events-none opacity-50 cursor-not-allowed'
    );
  }

  onTriggerClick(): void {
    if (this.effectiveTrigger() === 'click') {
      this.isOpen.update(prev => !prev);
    }
  }

  onMouseEnter(): void {
    if (this.effectiveTrigger() === 'hover') {
      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
      this.isOpen.set(true);
    }
  }

  onMouseLeave(): void {
    if (this.effectiveTrigger() === 'hover') {
      this.hoverTimeout = setTimeout(() => {
        this.isOpen.set(false);
      }, 150);
    }
  }

  onItemSelect(value: string): void {
    this.select.emit(value);
    this.isOpen.set(false);
  }
}
