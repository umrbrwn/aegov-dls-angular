import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  icon?: string;
}

export type BreadcrumbSeparator = 'slash' | 'caret';

@Component({
  selector: 'ae-breadcrumbs',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      aria-label="Breadcrumb"
      [class]="class()"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <ol class="flex flex-wrap items-center">
        @for (item of items(); track item.label; let idx = $index; let isLast = $last; let isFirst = $first) {
          <li
            class="flex items-center"
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            @if (isLast) {
              <span aria-current="page" class="text-sm font-semibold text-gray-800 max-w-[160px] truncate" itemprop="name">
                @if (isFirst && showHomeIcon()) {
                  <ae-icon name="house" [size]="16" class="mr-1 rtl:ml-1 rtl:mr-0 inline-block"></ae-icon>
                } @else if (item.icon) {
                  <ae-icon [name]="item.icon" [size]="16" class="mr-1 rtl:ml-1 rtl:mr-0 inline-block"></ae-icon>
                }
                <span itemprop="name" class="truncate">{{ item.label }}</span>
              </span>
            } @else {
              <a
                [href]="item.href || '#'"
                class="text-sm text-gray-500 hover:text-primary-600 max-w-[140px] truncate font-medium py-2 hover:underline decoration-2 underline-offset-2 flex items-center"
                itemprop="item"
              >
                @if (isFirst && showHomeIcon()) {
                  <ae-icon name="house" [size]="16" class="mr-1 rtl:ml-1 rtl:mr-0 inline-block"></ae-icon>
                } @else if (item.icon) {
                  <ae-icon [name]="item.icon" [size]="16" class="mr-1 rtl:ml-1 rtl:mr-0 inline-block"></ae-icon>
                }
                <span itemprop="name" class="truncate">{{ item.label }}</span>
              </a>
            }

            @if (!isLast) {
              @if (separator() === 'caret') {
                <ae-icon name="caret-right" [size]="16" class="text-gray-400 mx-2 rtl:scale-x-[-1]"></ae-icon>
              } @else {
                <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
              }
            }
            <meta itemprop="position" [attr.content]="idx + 1" />
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BreadcrumbsComponent {
  readonly items = input<BreadcrumbItemData[]>([]);
  readonly separator = input<BreadcrumbSeparator>('slash');
  readonly showHomeIcon = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');
}
