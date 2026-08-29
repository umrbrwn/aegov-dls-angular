import {
  Component,
  input,
  signal,
  computed,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  output,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

export type PopoverTrigger = 'click' | 'hover';
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'ae-popover',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative inline-block"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div (click)="onTriggerClick()">
        <ng-content select="[trigger], [slot=trigger]"></ng-content>
      </div>

      @if (isVisible()) {
        <div
          [class]="contentClasses()"
          role="dialog"
        >
          <button
            type="button"
            (click)="close()"
            class="absolute right-3 rtl:left-3 rtl:right-auto top-3 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Close popover"
          >
            <ae-icon name="x" [size]="16" class="text-gray-500"></ae-icon>
          </button>

          <div class="pr-6">
            <ng-content></ng-content>
          </div>
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
export class PopoverComponent {
  readonly trigger = input<PopoverTrigger>('click');
  readonly side = input<PopoverSide>('bottom');
  readonly align = input<PopoverAlign>('center');
  readonly sideOffset = input<number>(5);
  readonly isOpen = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly openChange = output<boolean>();

  readonly openSignal = signal<boolean>(false);
  private hoverTimeout: any = null;

  readonly effectiveTrigger = computed<PopoverTrigger>(() => this.trigger() || 'click');
  readonly effectiveSide = computed<PopoverSide>(() => this.side() || 'bottom');
  readonly effectiveAlign = computed<PopoverAlign>(() => this.align() || 'center');

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.effectiveTrigger() === 'click' && !this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  readonly isVisible = computed(() => this.openSignal() || !!this.isOpen());

  readonly contentClasses = computed(() => {
    const s = this.effectiveSide();
    const a = this.effectiveAlign();

    let sideClass = '';
    let alignClass = '';

    if (s === 'bottom') {
      sideClass = 'top-full mt-2';
      alignClass = a === 'center' ? 'left-1/2 -translate-x-1/2' : a === 'end' ? 'right-0 rtl:left-0 rtl:right-auto' : 'left-0 rtl:right-0 rtl:left-auto';
    } else if (s === 'top') {
      sideClass = 'bottom-full mb-2';
      alignClass = a === 'center' ? 'left-1/2 -translate-x-1/2' : a === 'end' ? 'right-0 rtl:left-0 rtl:right-auto' : 'left-0 rtl:right-0 rtl:left-auto';
    } else if (s === 'left') {
      sideClass = 'right-full mr-2';
      alignClass = a === 'center' ? 'top-1/2 -translate-y-1/2' : a === 'end' ? 'bottom-0' : 'top-0';
    } else if (s === 'right') {
      sideClass = 'left-full ml-2';
      alignClass = a === 'center' ? 'top-1/2 -translate-y-1/2' : a === 'end' ? 'bottom-0' : 'top-0';
    }

    return cn(
      'absolute z-50 w-72 rounded-lg bg-white p-4 shadow-lg border border-gray-200 animate-fadeIn',
      sideClass,
      alignClass,
      this.class()
    );
  });

  onTriggerClick(): void {
    if (this.effectiveTrigger() === 'click') {
      const next = !this.openSignal();
      this.openSignal.set(next);
      this.openChange.emit(next);
    }
  }

  onMouseEnter(): void {
    if (this.effectiveTrigger() === 'hover') {
      if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
      this.openSignal.set(true);
      this.openChange.emit(true);
    }
  }

  onMouseLeave(): void {
    if (this.effectiveTrigger() === 'hover') {
      this.hoverTimeout = setTimeout(() => {
        this.openSignal.set(false);
        this.openChange.emit(false);
      }, 150);
    }
  }

  close(): void {
    this.openSignal.set(false);
    this.openChange.emit(false);
  }
}
