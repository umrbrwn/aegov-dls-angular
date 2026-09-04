import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  inject,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../Icon/icon.component';
import { ToastService } from './toast.service';

@Component({
  selector: 'ae-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Standalone Controlled Toast -->
    @if (open()) {
      <div
        class="fixed bottom-4 right-4 z-50 w-[380px] bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-slideIn"
      >
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <ng-content></ng-content>
          </div>
          <button
            type="button"
            (click)="closeToast()"
            class="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <ae-icon name="x" [size]="16"></ae-icon>
          </button>
        </div>
      </div>
    }

    <!-- Global Toast Queue from ToastService -->
    <div class="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-[400px] max-w-[100vw] m-0 list-none z-50 pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-slideIn pointer-events-auto flex items-start justify-between gap-4"
        >
          <div class="flex items-start gap-3">
            @if (toast.variant === 'success') {
              <ae-icon name="check-circle" [size]="20" class="text-aegreen-600 mt-0.5"></ae-icon>
            } @else if (toast.variant === 'error') {
              <ae-icon name="x-circle" [size]="20" class="text-aered-600 mt-0.5"></ae-icon>
            } @else if (toast.variant === 'warning') {
              <ae-icon name="warning" [size]="20" class="text-camel-600 mt-0.5"></ae-icon>
            } @else {
              <ae-icon name="info" [size]="20" class="text-techblue-600 mt-0.5"></ae-icon>
            }
            <div>
              @if (toast.title) {
                <div class="font-bold text-gray-900 text-sm mb-0.5">{{ toast.title }}</div>
              }
              <div class="text-sm text-gray-600">{{ toast.message }}</div>
            </div>
          </div>

          <button
            type="button"
            (click)="toastService.dismiss(toast.id)"
            class="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ae-icon name="x" [size]="14"></ae-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  readonly duration = input<number>(5000);
  readonly showToast = input<boolean, unknown>(false, { transform: booleanAttribute });

  readonly open = signal<boolean>(false);
  readonly dismiss = output<void>();
  private timeoutId: any = null;

  constructor() {
    effect(() => {
      if (this.showToast()) {
        this.openToast();
      }
    });
  }

  openToast(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.open.set(true);
    if (this.duration() > 0) {
      this.timeoutId = setTimeout(() => {
        this.closeToast();
      }, this.duration());
    }
  }

  closeToast(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.open.set(false);
    this.dismiss.emit();
  }
}
