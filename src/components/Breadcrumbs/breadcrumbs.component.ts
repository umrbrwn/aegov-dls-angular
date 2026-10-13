import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective, type IconName } from '../Icon/icon.directive';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  title?: string;
  icon?: IconName;
}

export type BreadcrumbSeparator = 'slash' | 'caret' | 'none';

@Component({
  selector: 'ae-breadcrumbs',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      [attr.aria-label]="ariaLabel()"
      [class]="navClasses()"
    >
      <ol
        [attr.itemscope]="microdata() ? '' : null"
        [attr.itemtype]="microdata() ? 'https://schema.org/BreadcrumbList' : null"
      >
        @for (item of items(); track item.label + '_' + $index; let idx = $index; let isLast = $last; let isFirst = $first) {
          <li
            [attr.itemprop]="microdata() ? 'itemListElement' : null"
            [attr.itemscope]="microdata() ? '' : null"
            [attr.itemtype]="microdata() ? 'https://schema.org/ListItem' : null"
          >
            @if (isLast) {
              <span
                aria-current="page"
                [attr.itemprop]="microdata() ? 'name' : null"
              >
                @if (isFirst && showHomeIcon()) {
                  <svg aeIcon name="house" [size]="20" class="rtl:-scale-x-100"></svg>
                } @else if (item.icon) {
                  <svg aeIcon [name]="item.icon" [size]="20" class="rtl:-scale-x-100"></svg>
                }
                {{ item.label }}
              </span>
            } @else {
              <a
                [href]="item.href || '#'"
                [attr.title]="item.title || item.label"
                [attr.itemprop]="microdata() ? 'item' : null"
              >
                @if (isFirst && showHomeIcon()) {
                  <svg aeIcon name="house" [size]="20" class="rtl:-scale-x-100"></svg>
                } @else if (item.icon) {
                  <svg aeIcon [name]="item.icon" [size]="20" class="rtl:-scale-x-100"></svg>
                }
                @if (microdata()) {
                  <span itemprop="name">{{ item.label }}</span>
                } @else {
                  {{ item.label }}
                }
              </a>
            }

            @if (separator() === 'caret' && !isLast) {
              <svg
                aeIcon
                name="caret-right"
                [size]="16"
                class="w-4 h-4 inline-block mx-2 rtl:-scale-x-100"
              ></svg>
            }

            @if (microdata()) {
              <meta itemprop="position" [attr.content]="idx + 1" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    :host .aegov-breadcrumb a > span,
    :host .aegov-breadcrumb [aria-current="page"] > span {
      display: inline !important;
      position: static !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    :host .aegov-breadcrumb a > span::after,
    :host .aegov-breadcrumb [aria-current="page"] > span::after {
      display: none !important;
      content: none !important;
    }
  `]
})
export class BreadcrumbsComponent {
  /**
   * List of breadcrumb navigation items
   */
  readonly items = input<BreadcrumbItem[]>([]);

  /**
   * Separator style between breadcrumbs ('slash' | 'caret' | 'none')
   */
  readonly separator = input<BreadcrumbSeparator>('slash');

  /**
   * Whether to display a home icon on the first breadcrumb link
   */
  readonly showHomeIcon = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether to render Schema.org microdata attributes (BreadcrumbList/ListItem)
   */
  readonly microdata = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Accessible ARIA label for the nav element (defaults to 'Breadcrumb')
   */
  readonly ariaLabel = input<string>('Breadcrumb');

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  protected readonly navClasses = computed(() => {
    return cn(
      'aegov-breadcrumb',
      this.separator() === 'slash' && 'with-seperator',
      this.className()
    );
  });
}
