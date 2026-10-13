import {
  Directive,
  input,
  computed,
  booleanAttribute,
} from '@angular/core';
import { cn } from '../../utils/cn';

export type BlockquoteVariant = 'default' | 'colored';

/**
 * Blockquote directive that applies UAE Government Design System styling directly
 * to native `<blockquote>` elements without wrapping shells.
 *
 * @example
 * ```html
 * <blockquote aeBlockquote [colored]="true">
 *   <p>Design is not just what it looks like and feels like. Design is how it works.</p>
 *   <div class="quote-footer">
 *     <div class="quote-author">Steve Jobs</div>
 *     <div class="quote-cite">Co-founder, Apple Inc.</div>
 *   </div>
 * </blockquote>
 * ```
 */
@Directive({
  selector: 'blockquote[aeBlockquote], [aeBlockquote]',
  standalone: true,
  host: {
    '[class]': 'quoteClasses()',
  },
})
export class BlockquoteDirective {
  /**
   * Visual variation ('default' | 'colored')
   */
  readonly variant = input<BlockquoteVariant>('default');

  /**
   * Whether to apply the distinct colored background styling (.quote-colored)
   */
  readonly colored = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('', { alias: 'class' });

  protected readonly isColored = computed(() => {
    return this.colored() || this.variant() === 'colored';
  });

  protected readonly quoteClasses = computed(() => {
    return cn(
      'aegov-quote',
      this.isColored() && 'quote-colored',
      this.className()
    );
  });
}
