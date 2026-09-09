import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

import { IconComponent } from '../Icon/icon.component';

export type BlockquoteTone = 'solid' | 'soft';

@Component({
  selector: 'ae-blockquote',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <blockquote
      [attr.cite]="cite()"
      [class]="quoteClasses()"
    >
      @if (tone() === 'soft') {
        <div class="absolute start-0 top-0 h-12 w-12 text-gray-800 flex items-center justify-center -scale-x-100 rtl:scale-x-100">
          <ae-icon name="quotes" [size]="48" className="text-gray-800"></ae-icon>
        </div>
      }

      <p class="text-gray-800">
        <ng-content></ng-content>
      </p>

      @if (author() || authorTitle()) {
        <footer class="mt-10">
          @if (author()) {
            <div class="mb-1 text-sm font-medium text-primary-700">
              {{ author() }}
            </div>
          }
          @if (authorTitle()) {
            <div class="text-sm font-normal text-primary-600">
              {{ authorTitle() }}
            </div>
          }
        </footer>
      }
    </blockquote>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class BlockquoteComponent {
  readonly cite = input<string | undefined>(undefined);
  readonly author = input<string | undefined>(undefined);
  readonly authorTitle = input<string | undefined>(undefined);
  readonly tone = input<BlockquoteTone>('soft');
  readonly className = input<string>('');

  readonly quoteClasses = computed(() =>
    cn(
      'relative p-6 text-base font-medium text-gray-800',
      this.tone() === 'solid'
        ? 'bg-primary-50 border-l-10 rtl:border-l-0 rtl:border-r-10 border-primary-500 ps-10 pe-10'
        : 'pl-14 rtl:pl-0 rtl:pr-14',
      this.className()
    )
  );
}
