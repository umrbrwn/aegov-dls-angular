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
import { IconDirective } from '../Icon/icon.directive';

export interface PageItem {
  type: 'page' | 'ellipsis';
  pageNumber?: number;
  isCurrent?: boolean;
  isSmaller?: boolean;
  isLarger?: boolean;
}

@Component({
  selector: 'ae-pagination',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()">
      <!-- ========================================== -->
      <!-- MOBILE PAGINATION (sm:hidden) -->
      <!-- ========================================== -->
      <div class="aegov-pagination flex flex-1 justify-between items-center sm:hidden" role="navigation" aria-label="Mobile Pagination">
        <a
          [href]="createPageHref(current() - 1)"
          class="aegov-pagination-previous"
          [class.pointer-events-none]="current() <= 1"
          [class.opacity-40]="current() <= 1"
          [attr.aria-disabled]="current() <= 1 ? 'true' : null"
          (click)="onPageClick(current() - 1, $event)"
        >
          <svg aeIcon name="caret-left" [size]="20" class="rtl:-scale-x-100"></svg>
          <span>{{ previousLabel() }}</span>
        </a>

        <span class="pages font-normal text-aeblack-800 text-sm">
          {{ pageLabel() }} {{ current() }} {{ ofLabel() }} {{ totalPages() }}
        </span>

        <a
          [href]="createPageHref(current() + 1)"
          class="aegov-pagination-next"
          [class.pointer-events-none]="current() >= totalPages()"
          [class.opacity-40]="current() >= totalPages()"
          [attr.aria-disabled]="current() >= totalPages()"
          (click)="onPageClick(current() + 1, $event)"
        >
          <span>{{ nextLabel() }}</span>
          <svg aeIcon name="caret-right" [size]="20" class="rtl:-scale-x-100"></svg>
        </a>
      </div>

      <!-- ========================================== -->
      <!-- DESKTOP PAGINATION (max-sm:hidden) -->
      <!-- ========================================== -->
      <div class="aegov-pagination max-sm:hidden" role="navigation" aria-label="Desktop Pagination">
        <!-- Optional First Page Button -->
        @if (showFirstLast()) {
          <a
            [href]="createPageHref(1)"
            class="aegov-pagination-first"
            aria-label="First Page"
            [class.pointer-events-none]="current() <= 1"
            [class.opacity-40]="current() <= 1"
            [attr.aria-disabled]="current() <= 1 ? 'true' : null"
            (click)="onPageClick(1, $event)"
          >
            <svg aeIcon name="caret-double-left" [size]="20" class="rtl:-scale-x-100"></svg>
            <span>{{ firstLabel() }}</span>
          </a>
        }

        <!-- Previous Page Button -->
        <a
          [href]="createPageHref(current() - 1)"
          class="aegov-pagination-previous"
          rel="prev"
          aria-label="Previous Page"
          [class.pointer-events-none]="current() <= 1"
          [class.opacity-40]="current() <= 1"
          [attr.aria-disabled]="current() <= 1 ? 'true' : null"
          (click)="onPageClick(current() - 1, $event)"
        >
          <svg aeIcon name="caret-left" [size]="20" class="rtl:-scale-x-100"></svg>
          <span>{{ previousLabel() }}</span>
        </a>

        <!-- Page Numbers List -->
        @for (item of calculatedPages(); track $index) {
          @if (item.type === 'ellipsis') {
            <span class="aegov-pagination-extend select-none">...</span>
          } @else if (item.isCurrent) {
            <span aria-current="page" class="aegov-pagination-current select-none">
              {{ item.pageNumber }}
            </span>
          } @else {
            <a
              [href]="createPageHref(item.pageNumber!)"
              class="aegov-pagination-page cursor-pointer"
              [class.aegov-pagination-smaller]="item.isSmaller"
              [class.aegov-pagination-larger]="item.isLarger"
              [title]="'Page ' + item.pageNumber"
              (click)="onPageClick(item.pageNumber!, $event)"
            >
              {{ item.pageNumber }}
            </a>
          }
        }

        <!-- Next Page Button -->
        <a
          [href]="createPageHref(current() + 1)"
          class="aegov-pagination-next"
          rel="next"
          aria-label="Next Page"
          [class.pointer-events-none]="current() >= totalPages()"
          [class.opacity-40]="current() >= totalPages()"
          [attr.aria-disabled]="current() >= totalPages() ? 'true' : null"
          (click)="onPageClick(current() + 1, $event)"
        >
          <span>{{ nextLabel() }}</span>
          <svg aeIcon name="caret-right" [size]="20" class="rtl:-scale-x-100"></svg>
        </a>

        <!-- Optional Last Page Button -->
        @if (showFirstLast()) {
          <a
            [href]="createPageHref(totalPages())"
            class="aegov-pagination-last"
            aria-label="Last Page"
            [class.pointer-events-none]="current() >= totalPages()"
            [class.opacity-40]="current() >= totalPages()"
            [attr.aria-disabled]="current() >= totalPages() ? 'true' : null"
            (click)="onPageClick(totalPages(), $event)"
          >
            <span>{{ lastLabel() }}</span>
            <svg aeIcon name="caret-double-right" [size]="20" class="rtl:-scale-x-100"></svg>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class PaginationComponent {
  /**
   * The currently active page index (1-based)
   */
  readonly currentPage = input<number>(1);

  /**
   * Total number of available pages
   */
  readonly totalPages = input<number>(1);

  /**
   * Whether to display "First" and "Last" page navigation buttons
   */
  readonly showFirstLast = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Previous button text label
   */
  readonly previousLabel = input<string>('Previous');

  /**
   * Next button text label
   */
  readonly nextLabel = input<string>('Next');

  /**
   * First button text label
   */
  readonly firstLabel = input<string>('First');

  /**
   * Last button text label
   */
  readonly lastLabel = input<string>('Last');

  /**
   * Mobile page label (e.g. 'Page')
   */
  readonly pageLabel = input<string>('Page');

  /**
   * Mobile of label (e.g. 'of')
   */
  readonly ofLabel = input<string>('of');

  /**
   * URL pattern template for page links (e.g. '?page={page}' or '#page-{page}')
   */
  readonly pageUrlTemplate = input<string | undefined>(undefined);

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when page changes
   */
  readonly pageChange = output<number>();
  readonly onPageChange = output<number>();

  private readonly internalPage = signal<number>(1);

  constructor() {
    effect(() => {
      this.internalPage.set(this.currentPage() || 1);
    });
  }

  protected readonly current = computed<number>(() => {
    const p = this.internalPage();
    const total = Math.max(1, this.totalPages());
    return Math.min(Math.max(1, p), total);
  });

  protected readonly containerClasses = computed<string>(() =>
    cn('flex items-center justify-center w-full', this.className())
  );

  protected readonly calculatedPages = computed<PageItem[]>(() => {
    const total = Math.max(1, this.totalPages());
    const curr = this.current();
    const items: PageItem[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        items.push({
          type: 'page',
          pageNumber: i,
          isCurrent: i === curr,
          isSmaller: i < curr,
          isLarger: i > curr,
        });
      }
    } else {
      if (curr <= 3) {
        // e.g. 1 2 3 4 5 ... 17
        for (let i = 1; i <= Math.min(5, total); i++) {
          items.push({
            type: 'page',
            pageNumber: i,
            isCurrent: i === curr,
            isSmaller: i < curr,
            isLarger: i > curr,
          });
        }
        if (total > 5) {
          items.push({ type: 'ellipsis' });
          items.push({
            type: 'page',
            pageNumber: total,
            isCurrent: false,
            isLarger: true,
          });
        }
      } else if (curr >= total - 2) {
        // e.g. 1 ... 13 14 15 16 17
        items.push({
          type: 'page',
          pageNumber: 1,
          isCurrent: false,
          isSmaller: true,
        });
        items.push({ type: 'ellipsis' });
        for (let i = total - 4; i <= total; i++) {
          items.push({
            type: 'page',
            pageNumber: i,
            isCurrent: i === curr,
            isSmaller: i < curr,
            isLarger: i > curr,
          });
        }
      } else {
        // e.g. 1 ... 9 10 11 ... 17
        items.push({
          type: 'page',
          pageNumber: 1,
          isCurrent: false,
          isSmaller: true,
        });
        items.push({ type: 'ellipsis' });
        for (let i = curr - 1; i <= curr + 1; i++) {
          items.push({
            type: 'page',
            pageNumber: i,
            isCurrent: i === curr,
            isSmaller: i < curr,
            isLarger: i > curr,
          });
        }
        items.push({ type: 'ellipsis' });
        items.push({
          type: 'page',
          pageNumber: total,
          isCurrent: false,
          isLarger: true,
        });
      }
    }

    return items;
  });

  protected createPageHref(page: number): string {
    const tpl = this.pageUrlTemplate();
    if (tpl) {
      return tpl.replace('{page}', page.toString());
    }
    return '#';
  }

  protected onPageClick(page: number, event: MouseEvent): void {
    if (!this.pageUrlTemplate()) {
      event.preventDefault();
    }
    const total = Math.max(1, this.totalPages());
    if (page < 1 || page > total || page === this.current()) {
      return;
    }
    this.internalPage.set(page);
    this.pageChange.emit(page);
    this.onPageChange.emit(page);
  }
}
