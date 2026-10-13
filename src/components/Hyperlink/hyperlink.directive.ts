import {
  Directive,
  input,
  computed,
  booleanAttribute,
  ElementRef,
  inject,
  AfterContentInit,
  Renderer2,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '../../utils/cn';

export type HyperlinkVariant =
  | 'default'
  | 'cta'
  | 'soft'
  | 'secondary'
  | 'secondary-soft'
  | 'btn-outline'
  | 'btn-soft';

/**
 * Hyperlink directive that applies UAE Government Design System styling directly
 * to native `<a>` anchor elements without wrapping shells.
 * Automatically ensures security rel attributes and accessible screen-reader announcements
 * for new-tab and download links non-destructively.
 *
 * @example
 * ```html
 * <a aeHyperlink href="/services" variant="cta">Our Services</a>
 * <a aeHyperlink [routerLink]="['/dashboard']" variant="soft">Dashboard</a>
 * <a aeHyperlink href="https://example.ae" target="_blank">External Portal</a>
 * ```
 */
@Directive({
  selector: 'a[aeHyperlink], [aeHyperlink]',
  standalone: true,
  host: {
    '[class]': 'linkClasses()',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '(click)': 'disabled() ? $event.preventDefault() : null',
  },
})
export class HyperlinkDirective implements AfterContentInit {
  private readonly el = inject(ElementRef<HTMLAnchorElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Visual style variant of the link
   */
  readonly variant = input<HyperlinkVariant>('default');

  /**
   * Color theme of the link ('primary' | 'secondary')
   */
  readonly color = input<'primary' | 'secondary'>('primary');

  /**
   * Disabled state (prevents navigation, dims appearance)
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('', { alias: 'class' });

  ngAfterContentInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const anchor = this.el.nativeElement;

    // 1. Automatic Security & WCAG 2.4.4 announcement for New Tab links (target="_blank")
    if (anchor.target === '_blank') {
      // Auto-set rel="noopener noreferrer" if developer omitted it
      if (!anchor.getAttribute('rel')) {
        this.renderer.setAttribute(anchor, 'rel', 'noopener noreferrer');
      }

      // Append screen-reader announcement only if developer did not already provide an accessible label or .sr-only element
      const hasSrOnly = anchor.querySelector('.sr-only');
      const hasExplicitLabel = anchor.hasAttribute('aria-label') || anchor.hasAttribute('aria-labelledby');

      if (!hasSrOnly && !hasExplicitLabel) {
        const srSpan = this.renderer.createElement('span');
        this.renderer.addClass(srSpan, 'sr-only');
        const text = this.renderer.createText(' (opens in a new tab)');
        this.renderer.appendChild(srSpan, text);
        this.renderer.appendChild(anchor, srSpan);
      }
    }

    // 2. Automatic Announcement for Download Links
    if (anchor.hasAttribute('download')) {
      const hasSrOnly = anchor.querySelector('.sr-only');
      const hasExplicitLabel = anchor.hasAttribute('aria-label') || anchor.hasAttribute('aria-labelledby');

      if (!hasSrOnly && !hasExplicitLabel) {
        const srSpan = this.renderer.createElement('span');
        this.renderer.addClass(srSpan, 'sr-only');
        const text = this.renderer.createText(' (download file)');
        this.renderer.appendChild(srSpan, text);
        this.renderer.appendChild(anchor, srSpan);
      }
    }
  }

  protected readonly linkClasses = computed<string>(() => {
    const v = this.variant();
    const c = this.color();
    const dis = this.disabled();

    const isBtn = v === 'btn-outline' || v === 'btn-soft';
    const isLink = v === 'cta' || v === 'soft' || v === 'secondary' || v === 'secondary-soft';
    const isDefault = v === 'default';

    return cn(
      isBtn && 'aegov-btn',
      v === 'btn-outline' && 'btn-outline',
      v === 'btn-soft' && 'btn-soft',
      isBtn && c === 'secondary' && 'btn-secondary',
      isLink && 'aegov-link',
      (v === 'soft' || v === 'secondary-soft') && 'link-soft',
      (v === 'secondary' || v === 'secondary-soft') && 'link-secondary',
      isDefault && 'text-primary-600 underline hover:text-primary-500 hover:decoration-2 active:text-primary-700 transition-colors',
      isDefault && c === 'secondary' && 'text-aeblack-800 hover:text-aeblack-700 active:text-aeblack-900',
      dis && 'pointer-events-none opacity-50 cursor-not-allowed select-none',
      this.className()
    );
  });
}
