import {
  Component,
  input,
  output,
  signal,
  computed,
  HostListener,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../Icon/icon.component';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type ModalVariant = 'default' | 'danger';

@Component({
  selector: 'ae-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Modal Trigger Slot (Optional) -->
    <div (click)="openModal()" class="inline-block">
      <ng-content select="[trigger], [slot=trigger]"></ng-content>
    </div>

    @if (isVisible()) {
      <!-- Backdrop Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs animate-fadeIn"
        (click)="onBackdropClick()"
      ></div>

      <!-- Modal Content Dialog -->
      <div
        role="dialog"
        aria-modal="true"
        [class]="dialogClasses()"
      >
        @if (title()) {
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-semibold text-gray-900">
              {{ title() }}
            </h2>
            <button
              type="button"
              (click)="closeModal()"
              class="rounded-lg p-1.5 hover:bg-gray-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-400 cursor-pointer"
              aria-label="Close modal"
            >
              <ae-icon name="x" [size]="20" class="text-gray-500"></ae-icon>
            </button>
          </div>
        }

        <div>
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ModalComponent {
  readonly title = input<string | undefined>(undefined);
  readonly size = input<ModalSize>('md');
  readonly variant = input<ModalVariant>('default');
  readonly closeOnBackdrop = input<boolean, unknown>(true, { transform: booleanAttribute });
  readonly isOpen = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');
  readonly dialogClass = input<string>('');

  readonly openChange = output<boolean>();
  readonly close = output<void>();

  readonly openSignal = signal<boolean>(false);

  readonly effectiveSize = computed<ModalSize>(() => this.size() || 'md');
  readonly effectiveVariant = computed<ModalVariant>(() => this.variant() || 'default');

  readonly sizeClasses: Record<ModalSize, string> = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-xl',
    xl: 'sm:max-w-3xl'
  };

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.openSignal() || this.isOpen()) {
      this.closeModal();
    }
  }

  readonly isVisible = computed(() => this.openSignal() || !!this.isOpen());

  readonly dialogClasses = computed(() =>
    cn(
      'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
      'w-full p-5 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto',
      'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 animate-fadeIn',
      this.sizeClasses[this.effectiveSize()],
      this.dialogClass(),
      this.class()
    )
  );

  openModal(): void {
    this.openSignal.set(true);
    this.openChange.emit(true);
  }

  closeModal(): void {
    this.openSignal.set(false);
    this.openChange.emit(false);
    this.close.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.closeModal();
    }
  }
}
