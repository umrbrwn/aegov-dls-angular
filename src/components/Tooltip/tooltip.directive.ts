import {
  Directive,
  input,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy
} from '@angular/core';
import type { TooltipSide } from './tooltip.component';

@Directive({
  selector: '[aeTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  readonly aeTooltip = input.required<string>();
  readonly tooltipSide = input<TooltipSide>('top');

  private tooltipEl: HTMLElement | null = null;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  @HostListener('focusin')
  onMouseEnter(): void {
    if (!this.aeTooltip() || this.tooltipEl) return;
    this.createTooltip();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  private createTooltip(): void {
    const text = this.aeTooltip();
    if (!text) return;

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'fixed');
    this.renderer.addClass(this.tooltipEl, 'z-50');
    this.renderer.addClass(this.tooltipEl, 'rounded-md');
    this.renderer.addClass(this.tooltipEl, 'bg-gray-900');
    this.renderer.addClass(this.tooltipEl, 'px-4');
    this.renderer.addClass(this.tooltipEl, 'py-2');
    this.renderer.addClass(this.tooltipEl, 'text-sm');
    this.renderer.addClass(this.tooltipEl, 'text-white');
    this.renderer.addClass(this.tooltipEl, 'shadow-md');
    this.renderer.addClass(this.tooltipEl, 'pointer-events-none');
    this.renderer.addClass(this.tooltipEl, 'whitespace-nowrap');

    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(this.tooltipEl, textNode);
    this.renderer.appendChild(document.body, this.tooltipEl);

    // Calculate position
    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl!.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (this.tooltipSide()) {
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

    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
  }

  private removeTooltip(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }
}
