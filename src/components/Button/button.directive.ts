import {
  Directive,
  computed,
  input,
  booleanAttribute,
  ElementRef,
  inject,
  AfterContentInit,
  Renderer2,
  isDevMode,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '../../utils/cn';

export type AegovButtonVariant = 'solid' | 'outline' | 'soft' | 'link';
export type AegovButtonColor = 'primary' | 'secondary';
export type AegovButtonSize = 'xs' | 'sm' | 'base' | 'lg';

/**
 * Button directive that applies UAE Government Design System styling directly
 * to native `<button>` and `<a>` elements without wrapping shells.
 * Automatically synchronizes ARIA accessibility attributes non-destructively.
 *
 * @example
 * ```html
 * <button aeButton variant="solid" color="primary">Submit</button>
 * <button aeButton variant="outline" size="sm" (click)="cancel()">Cancel</button>
 * <a aeButton href="/home" variant="soft">Home</a>
 * <button aeButton [isIcon]="true" aria-label="Search">
 *   <svg aeIcon name="magnifying-glass"></svg>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[aeButton], a[aeButton], [aeButton]',
  standalone: true,
  host: {
    '[class]': 'buttonClasses()',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
  },
})
export class ButtonDirective implements AfterContentInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Button visual variant: 'solid' | 'outline' | 'soft' | 'link'
   */
  readonly variant = input<AegovButtonVariant>('solid');

  /**
   * Button color scheme: 'primary' | 'secondary'
   */
  readonly color = input<AegovButtonColor>('primary');

  /**
   * Button size: 'xs' | 'sm' | 'base' | 'lg'
   */
  readonly size = input<AegovButtonSize>('base');

  /**
   * Whether this button is an icon-only button (applies 'btn-icon')
   */
  readonly isIcon = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Disabled state
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('', { alias: 'class' });

  ngAfterContentInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const btn = this.el.nativeElement;
    const textContent = btn.textContent?.trim() || '';
    const hasExplicitLabel = btn.hasAttribute('aria-label') || btn.hasAttribute('aria-labelledby');

    // For icon-only buttons or buttons lacking textual content
    if (this.isIcon() || textContent.length === 0) {
      if (hasExplicitLabel) return; // Non-destructive: developer already provided an accessible label

      // 1. Mirror aeTooltip or title attribute if available
      const tooltipText = btn.getAttribute('aeTooltip') || btn.getAttribute('title');
      if (tooltipText) {
        this.renderer.setAttribute(btn, 'aria-label', tooltipText);
        return;
      }

      // 2. Dev-mode diagnostic warning to assist developers in fulfilling WCAG 4.1.2
      if (isDevMode()) {
        console.warn(
          `[aegov-dls-angular] WCAG 4.1.2 Warning: Icon-only <button aeButton> has no accessible name. ` +
          `Please provide an aria-label="..." or aeTooltip="...".`,
          btn
        );
      }
    }
  }

  /**
   * Computed class list using cn utility and strictly the design system classes from the HTML specification
   */
  protected readonly buttonClasses = computed<string>(() => {
    const v = this.variant();
    const sz = this.size();
    const c = this.color();

    return cn(
      'aegov-btn',
      v === 'outline' && 'btn-outline',
      v === 'soft' && 'btn-soft',
      v === 'link' && 'btn-link',
      sz === 'xs' && 'btn-xs',
      sz === 'sm' && 'btn-sm',
      sz === 'lg' && 'btn-lg',
      c === 'secondary' && 'btn-secondary',
      this.isIcon() && 'btn-icon',
      this.className()
    );
  });
}