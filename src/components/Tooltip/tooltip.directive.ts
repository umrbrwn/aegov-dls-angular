import {
  Directive,
  input,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy
} from '@angular/core';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Tooltip directive that attaches a floating UAE Government Design System tooltip
 * directly to any interactive host element (<button>, <a>, <span>, etc.) without wrapper DOM overhead.
 * Automatically synchronizes ARIA accessibility attributes (aria-describedby) non-destructively.
 *
 * @example
 * ```html
 * <button aeButton aeTooltip="Print document" tooltipPlacement="top">Print</button>
 * <a aeHyperlink href="/help" aeTooltip="Help Center" tooltipPlacement="right">Help</a>
 * ```
 */
@Directive({
  selector: '[aeTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  /** Text content displayed in the floating tooltip */
  readonly aeTooltip = input<string>('');

  /** Placement side relative to host element: 'top' | 'right' | 'bottom' | 'left' */
  readonly tooltipSide = input<TooltipPlacement>('top');

  /** Alias placement side option: 'top' | 'right' | 'bottom' | 'left' */
  readonly tooltipPlacement = input<TooltipPlacement | undefined>(undefined);

  private tooltipEl: HTMLElement | null = null;
  private readonly tooltipId = `aegov-tt-${Math.random().toString(36).substring(2, 9)}`;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  @HostListener('focusin')
  protected onMouseEnter(): void {
    if (!this.aeTooltip() || this.tooltipEl) return;
    this.createTooltip();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  protected onMouseLeave(): void {
    this.removeTooltip();
  }

  private createTooltip(): void {
    const text = this.aeTooltip();
    if (!text) return;

    const side = this.tooltipPlacement() || this.tooltipSide() || 'top';

    const tooltipEl: HTMLElement = this.renderer.createElement('div');
    this.tooltipEl = tooltipEl;

    tooltipEl.id = this.tooltipId;
    this.renderer.addClass(tooltipEl, 'z-50');
    this.renderer.addClass(tooltipEl, 'aegov-tooltip');
    this.renderer.addClass(tooltipEl, '!opacity-100');
    this.renderer.addClass(tooltipEl, '!visible');
    this.renderer.addClass(tooltipEl, 'fixed');
    this.renderer.addClass(tooltipEl, 'whitespace-nowrap');
    this.renderer.addClass(tooltipEl, 'pointer-events-none');
    this.renderer.setAttribute(tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(tooltipEl, 'data-tooltip-placement', side);
    this.renderer.setAttribute(tooltipEl, 'data-popper-placement', side);

    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(tooltipEl, textNode);

    const arrowEl = this.renderer.createElement('div');
    this.renderer.addClass(arrowEl, 'tooltip-arrow');
    this.renderer.setAttribute(arrowEl, 'data-popper-arrow', '');

    const arrowPositionClasses: Record<TooltipPlacement, string> = {
      top: 'left-1/2 -translate-x-1/2',
      bottom: 'left-1/2 -translate-x-1/2',
      left: 'top-1/2 -translate-y-1/2',
      right: 'top-1/2 -translate-y-1/2',
    };
    arrowPositionClasses[side].split(' ').forEach((cls) => {
      this.renderer.addClass(arrowEl, cls);
    });

    this.renderer.appendChild(tooltipEl, arrowEl);
    this.renderer.appendChild(document.body, tooltipEl);

    // Non-destructively bind aria-describedby on host element for screen readers
    const hostEl = this.el.nativeElement;
    const existingDescribedBy = (hostEl.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== this.tooltipId);

    existingDescribedBy.push(this.tooltipId);
    this.renderer.setAttribute(hostEl, 'aria-describedby', existingDescribedBy.join(' '));

    // Calculate position
    const hostRect = hostEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (side) {
      case 'top':
        top = hostRect.top - tooltipRect.height - 8;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + 8;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + 8;
        break;
    }

    this.renderer.setStyle(tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(tooltipEl, 'left', `${left}px`);
  }

  private removeTooltip(): void {
    if (this.tooltipEl) {
      // Non-destructively clean up aria-describedby on host element
      const hostEl = this.el.nativeElement;
      const remainingDescribedBy = (hostEl.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter((id) => id && id !== this.tooltipId);

      if (remainingDescribedBy.length > 0) {
        this.renderer.setAttribute(hostEl, 'aria-describedby', remainingDescribedBy.join(' '));
      } else {
        this.renderer.removeAttribute(hostEl, 'aria-describedby');
      }

      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }
}
