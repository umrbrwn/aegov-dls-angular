import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

@Component({
  selector: 'ae-pagination',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      <!-- Mobile Pagination -->
      <div class="flex w-full items-center justify-between sm:hidden">
        <button
          type="button"
          (click)="onSelect(current() - 1)"
          [disabled]="current() === 1"
          class="inline-flex items-center gap-2 px-2 py-1 text-gray-700 disabled:opacity-50 cursor-pointer"
        >
          <ae-icon name="caret-left" [size]="20" class="rtl:-scale-x-100"></ae-icon>
          <span>Previous</span>
        </button>
        <span class="text-sm">Page {{ current() }} of {{ totalPages() }}</span>
        <button
          type="button"
          (click)="onSelect(current() + 1)"
          [disabled]="current() === totalPages()"
          class="inline-flex items-center gap-2 px-2 py-1 text-gray-700 disabled:opacity-50 cursor-pointer"
        >
          <span>Next</span>
          <ae-icon name="caret-right" [size]="20" class="rtl:-scale-x-100"></ae-icon>
        </button>
      </div>

      <!-- Desktop Pagination -->
      <div class="hidden sm:flex sm:items-center sm:gap-1">
        @if (showFirstLast()) {
          <button
            type="button"
            (click)="onSelect(1)"
            [disabled]="current() === 1"
            class="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50 cursor-pointer"
          >
            <ae-icon name="caret-double-left" [size]="20" class="rtl:-scale-x-100"></ae-icon>
            <span class="hidden lg:inline">First</span>
          </button>
        }

        <button
          type="button"
          (click)="onSelect(current() - 1)"
          [disabled]="current() === 1"
          class="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50 cursor-pointer"
        >
          <ae-icon name="caret-left" [size]="20" class="rtl:-scale-x-100"></ae-icon>
          <span class="hidden lg:inline">Previous</span>
        </button>

        <div class="flex items-center gap-1">
          @for (page of pageNumbers(); track $index) {
            @if (page === '...') {
              <span class="px-2 text-gray-400 select-none">...</span>
            } @else {
              <button
                type="button"
                (click)="onSelect(+page)"
                [class]="pageButtonClasses(+page)"
              >
                {{ page }}
              </button>
            }
          }
        </div>

        <button
          type="button"
          (click)="onSelect(current() + 1)"
          [disabled]="current() === totalPages()"
          class="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50 cursor-pointer"
        >
          <span class="hidden lg:inline">Next</span>
          <ae-icon name="caret-right" [size]="20" class="rtl:-scale-x-100"></ae-icon>
        </button>

        @if (showFirstLast()) {
          <button
            type="button"
            (click)="onSelect(totalPages())"
            [disabled]="current() === totalPages()"
            class="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50 cursor-pointer"
          >
            <span class="hidden lg:inline">Last</span>
            <ae-icon name="caret-double-right" [size]="20" class="rtl:-scale-x-100"></ae-icon>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PaginationComponent {
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly showFirstLast = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly pageChange = output<number>();

  readonly activePage = signal<number>(1);

  constructor() {
    effect(() => {
      this.activePage.set(this.currentPage());
    });
  }

  readonly current = computed(() => this.activePage() || 1);

  readonly wrapperClasses = computed(() =>
    cn('flex items-center justify-center', this.class())
  );

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.current();
    const pages: (number | string)[] = [];

    if (total > 7) {
      if (current <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      }
    } else {
      for (let i = 1; i <= total; i++) pages.push(i);
    }

    return pages;
  });

  pageButtonClasses(page: number): string {
    const isCurrent = this.current() === page;
    return cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors',
      isCurrent
        ? 'bg-primary-550 text-white shadow-xs'
        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
    );
  }

  onSelect(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.current()) return;
    this.activePage.set(page);
    this.pageChange.emit(page);
  }
}
