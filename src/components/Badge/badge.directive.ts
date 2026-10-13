import {
  Directive,
  input,
  computed,
} from '@angular/core';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'default' | 'info' | 'error' | 'success' | 'warning';
export type BadgeTone = 'soft' | 'solid';
export type BadgeSize = 'base' | 'lg';

/**
 * Badge directive that applies UAE Government Design System styling directly
 * to native `<span>` or `<a>` badge elements without wrapper shells.
 *
 * @example
 * ```html
 * <span aeBadge variant="success" tone="soft">Approved</span>
 * <a aeBadge href="/status" variant="info" size="lg">Details</a>
 * ```
 */
@Directive({
  selector: 'span[aeBadge], a[aeBadge], [aeBadge]',
  standalone: true,
  host: {
    '[class]': 'badgeClasses()'
  }
})
export class BadgeDirective {
  /**
   * Color/semantic type of the badge ('default' | 'info' | 'error' | 'success' | 'warning')
   */
  readonly variant = input<BadgeVariant>('default');

  /**
   * Visual tone / contrast style of the badge ('soft' | 'solid')
   */
  readonly tone = input<BadgeTone>('soft');

  /**
   * Size variation of the badge ('base' | 'lg')
   */
  readonly size = input<BadgeSize>('base');

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('', { alias: 'class' });

  protected readonly badgeClasses = computed(() => {
    return cn(
      'aegov-badge',
      this.variant() !== 'default' && `badge-${this.variant()}`,
      this.tone() === 'solid' ? 'badge-solid' : 'badge-soft',
      this.size() === 'lg' && 'badge-lg',
      this.className()
    );
  });
}
