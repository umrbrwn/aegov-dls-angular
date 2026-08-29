import {
  Component,
  input,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'ae-tooltip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-flex items-center gap-1 cursor-pointer"
      (mouseenter)="show()"
      (mouseleave)="hide()"
      (focusin)="show()"
      (focusout)="hide()"
    >
      <ng-content></ng-content>

      @if (isTooltipVisible() && content()) {
        <div [class]="tooltipClasses()" role="tooltip">
          {{ content() }}
          <div [class]="arrowClasses()"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class TooltipComponent {
  readonly content = input<string>('');
  readonly side = input<TooltipSide>('top');
  readonly align = input<TooltipAlign>('center');
  readonly isOpen = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly isHovered = signal<boolean>(false);

  readonly effectiveSide = computed<TooltipSide>(() => this.side() || 'top');
  readonly effectiveAlign = computed<TooltipAlign>(() => this.align() || 'center');

  readonly isTooltipVisible = computed(() => this.isHovered() || !!this.isOpen());

  readonly tooltipClasses = computed(() => {
    const sidePositions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    return cn(
      'absolute z-50 rounded-md bg-gray-900 px-4 py-2 text-sm text-white shadow-md whitespace-nowrap animate-fadeIn',
      sidePositions[this.effectiveSide()],
      this.class()
    );
  });

  readonly arrowClasses = computed(() => {
    const arrowPositions = {
      top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent border-4',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent border-4',
      left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent border-4',
      right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent border-4'
    };
    return cn('absolute w-0 h-0', arrowPositions[this.effectiveSide()]);
  });

  show(): void {
    this.isHovered.set(true);
  }

  hide(): void {
    this.isHovered.set(false);
  }
}
