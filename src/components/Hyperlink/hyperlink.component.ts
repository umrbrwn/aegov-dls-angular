import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, type Params, type QueryParamsHandling, type IsActiveMatchOptions } from '@angular/router';
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
  imports: [CommonModule, RouterModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #linkContent>
      {{ label() }}<ng-content></ng-content>
      @if (showIcon()) {
        <ae-icon [name]="icon()" [size]="20" className="rtl:-scale-x-100"></ae-icon>
      }
      @if (external()) {
        <span class="sr-only"> (opens in new tab)</span>
      }
    </ng-template>

    @if (hasRouterLink()) {
      <a
        [routerLink]="routerLink()!"
        [queryParams]="queryParams() || null"
        [fragment]="fragment() || undefined"
        [queryParamsHandling]="queryParamsHandling() || null"
        [preserveFragment]="preserveFragment()"
        [skipLocationChange]="skipLocationChange()"
        [replaceUrl]="replaceUrl()"
        [state]="state()"
        [routerLinkActive]="routerLinkActive() || ''"
        [routerLinkActiveOptions]="routerLinkActiveOptions() || { exact: false }"
        [target]="external() ? '_blank' : (target() || null)"
        [rel]="external() ? 'noopener noreferrer' : (rel() || null)"
        [class]="computedClasses()"
      >
        <ng-container *ngTemplateOutlet="linkContent"></ng-container>
      </a>
    } @else {
      <a
        [href]="href()"
        [target]="external() ? '_blank' : (target() || null)"
        [rel]="external() ? 'noopener noreferrer' : (rel() || null)"
        [class]="computedClasses()"
      >
        <ng-container *ngTemplateOutlet="linkContent"></ng-container>
      </a>
    }
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
  readonly routerLink = input<string | any[] | null | undefined>(undefined);
  readonly queryParams = input<Params | null | undefined>(undefined);
  readonly fragment = input<string | undefined>(undefined);
  readonly queryParamsHandling = input<QueryParamsHandling | null | undefined>(undefined);
  readonly preserveFragment = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly skipLocationChange = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly replaceUrl = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly state = input<Record<string, any> | undefined>(undefined);
  readonly routerLinkActive = input<string | string[] | undefined>(undefined);
  readonly routerLinkActiveOptions = input<{ exact: boolean } | IsActiveMatchOptions | undefined>(undefined);

  readonly variant = input<HyperlinkVariant>('default');
  readonly external = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly showIcon = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly icon = input<string>('caret-right');
  readonly target = input<string | undefined>(undefined);
  readonly rel = input<string | undefined>(undefined);
  readonly className = input<string>('');

  readonly hasRouterLink = computed(() => this.routerLink() != null);
  readonly effectiveVariant = computed<HyperlinkVariant>(() => this.variant() || 'default');

  readonly computedClasses = computed(() =>
    cn(
      'relative inline-flex items-center gap-2 rounded-sm transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      variantClasses[this.effectiveVariant()] || variantClasses.default,
      this.className()
    )
  );
}
