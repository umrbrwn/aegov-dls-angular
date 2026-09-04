import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../Icon/icon.component';

export type HyperlinkVariant = 'default' | 'cta' | 'soft' | 'secondary' | 'secondary-soft';

const variantClasses: Record<HyperlinkVariant, string> = {
  default: 'underline underline-offset-1 text-primary-600 hover:text-primary-500 hover:decoration-2 active:text-primary-700',
  cta: 'px-2.5 py-2 -ml-2.5 font-semibold text-primary-600 hover:text-primary-500 hover:underline rtl:-mr-2.5 rtl:ml-0',
  soft: 'px-2.5 py-2 -ml-2.5 font-semibold text-primary-600 hover:text-primary-500 hover:bg-primary-50 rtl:-mr-2.5 rtl:ml-0',
  secondary: 'px-2.5 py-2 -ml-2.5 font-semibold text-gray-800 hover:text-gray-700 hover:underline rtl:-mr-2.5 rtl:ml-0',
  'secondary-soft': 'px-2.5 py-2 -ml-2.5 font-semibold text-gray-800 hover:text-gray-700 hover:bg-gray-50 rtl:-mr-2.5 rtl:ml-0',
};

@Component({
  selector: 'ae-hyperlink, a[ae-hyperlink]',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [href]="href()"
      [target]="external() ? '_blank' : (target() || null)"
      [rel]="external() ? 'noopener noreferrer' : (rel() || null)"
      [class]="computedClasses()"
    >
      {{ label() }}<ng-content></ng-content>
      @if (icon()) {
        <ae-icon name="caret-right" [size]="20" class="rtl:-scale-x-100"></ae-icon>
      }
      @if (external()) {
        <span class="sr-only"> (opens in new tab)</span>
      }
    </a>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class HyperlinkComponent {
  readonly label = input<string | undefined>(undefined);
  readonly href = input<string>('#');
  readonly variant = input<HyperlinkVariant>('default');
  readonly external = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly icon = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly target = input<string | undefined>(undefined);
  readonly rel = input<string | undefined>(undefined);
  readonly class = input<string>('');

  readonly effectiveVariant = computed<HyperlinkVariant>(() => this.variant() || 'default');

  readonly computedClasses = computed(() =>
    cn(
      'relative inline-flex items-center gap-2 rounded-sm transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      variantClasses[this.effectiveVariant()] || variantClasses.default,
      this.class()
    )
  );
}
