import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

export interface StepItem {
  label: string;
  href?: string;
}

export type StepsSize = 'sm' | 'base' | 'lg';
export type StepsOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ae-steps',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      aria-label="Progress"
      [class]="navClasses()"
    >
      @if (isVertical()) {
        <!-- Vertical Orientation -->
        <ol role="list" class="flex flex-col" [class.gap-2]="!showLabels()" [class.gap-0]="showLabels()">
          @for (step of steps(); track step.label; let idx = $index; let last = $last) {
            <li class="relative flex items-start">
              <!-- Left indicator & vertical connector line -->
              <div class="flex flex-col items-center mr-4 rtl:mr-0 rtl:ml-4 shrink-0">
                <a
                  [href]="step.href || 'javascript:void(0)'"
                  [class]="buttonClasses(idx)"
                  [attr.aria-current]="idx === currentStep() ? 'step' : null"
                  [attr.aria-disabled]="isStepDisabled(idx) ? 'true' : null"
                  [attr.tabindex]="isStepDisabled(idx) ? -1 : null"
                >
                  @if (idx < currentStep()) {
                    <ae-icon name="check" [size]="iconSize()" class="stroke-[3]"></ae-icon>
                  } @else {
                    <span>{{ idx + 1 }}</span>
                  }
                  <span class="sr-only">{{ step.label }}</span>
                </a>

                @if (!last) {
                  <div
                    class="w-[3px] my-1.5 transition-colors duration-200"
                    [class]="idx < currentStep() ? 'bg-primary-500' : 'bg-gray-300'"
                    [class.opacity-20]="isStepDisabled(idx + 1)"
                    [style.min-height]="showLabels() ? '2.5rem' : '1.5rem'"
                    aria-hidden="true"
                  ></div>
                }
              </div>

              <!-- Right label content -->
              @if (showLabels()) {
                <div class="pt-2 pb-8 flex items-start">
                  <span [class]="verticalLabelClasses(idx)">
                    {{ step.label }}
                  </span>
                </div>
              }
            </li>
          }
        </ol>
      } @else {
        <!-- Horizontal Orientation -->
        <ol role="list" class="flex items-center w-full" [class.pb-8]="showLabels()">
          @for (step of steps(); track step.label; let idx = $index; let last = $last) {
            <li class="relative flex items-center" [class.flex-1]="!last">
              <!-- Step indicator and label container -->
              <div class="relative z-10 flex flex-col items-center">
                <a
                  [href]="step.href || 'javascript:void(0)'"
                  [class]="buttonClasses(idx)"
                  [attr.aria-current]="idx === currentStep() ? 'step' : null"
                  [attr.aria-disabled]="isStepDisabled(idx) ? 'true' : null"
                  [attr.tabindex]="isStepDisabled(idx) ? -1 : null"
                >
                  @if (idx < currentStep()) {
                    <ae-icon name="check" [size]="iconSize()" class="stroke-[3]"></ae-icon>
                  } @else {
                    <span>{{ idx + 1 }}</span>
                  }
                  <span class="sr-only">{{ step.label }}</span>
                </a>

                @if (showLabels()) {
                  <span [class]="horizontalLabelClasses(idx)">
                    {{ step.label }}
                  </span>
                }
              </div>

              <!-- Horizontal Connector Line between steps -->
              @if (!last) {
                <div
                  class="flex-1 h-[3px] mx-3 transition-colors duration-200"
                  [class]="idx < currentStep() ? 'bg-primary-500' : 'bg-gray-300'"
                  [class.opacity-20]="isStepDisabled(idx + 1)"
                  aria-hidden="true"
                ></div>
              }
            </li>
          }
        </ol>
      }
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class StepsComponent {
  readonly steps = input<StepItem[]>([]);
  readonly currentStep = input<number>(0);
  readonly size = input<StepsSize>('base');
  readonly orientation = input<StepsOrientation>('horizontal');
  readonly showLabels = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly effectiveSize = computed<StepsSize>(() => this.size() || 'base');
  readonly effectiveOrientation = computed<StepsOrientation>(() => this.orientation() || 'horizontal');

  readonly isVertical = computed(() => this.effectiveOrientation() === 'vertical');

  readonly sizeClasses = {
    link: {
      sm: 'h-8 w-8 text-sm',
      base: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg'
    },
  };

  readonly iconSize = computed(() => {
    switch (this.effectiveSize()) {
      case 'sm': return 16;
      case 'lg': return 24;
      default: return 20;
    }
  });

  readonly navClasses = computed(() =>
    cn('relative w-full', this.isVertical() ? 'flex flex-col' : 'w-full', this.class())
  );

  isStepDisabled(idx: number): boolean {
    return this.disabled() && idx > this.currentStep();
  }

  buttonClasses(idx: number): string {
    const isCompleted = idx < this.currentStep();
    const isCurrent = idx === this.currentStep();
    const isUpcoming = idx > this.currentStep();
    const isStepDisabled = this.isStepDisabled(idx);
    const sz = this.effectiveSize();

    return cn(
      'flex items-center justify-center rounded-full transition-all duration-200 shrink-0',
      this.sizeClasses.link[sz],
      isCompleted && 'bg-primary-500 text-white hover:ring-4 hover:ring-primary-100',
      isCurrent && 'bg-primary-500 text-white ring-4 ring-primary-100',
      isUpcoming && 'bg-white border-2 border-gray-200 text-gray-500 hover:border-primary-500 hover:text-primary-500',
      isStepDisabled && 'opacity-20 pointer-events-none'
    );
  }

  horizontalLabelClasses(idx: number): string {
    const isStepDisabled = this.isStepDisabled(idx);
    return cn(
      'absolute top-full mt-2 text-sm font-medium text-gray-900 whitespace-nowrap text-center',
      isStepDisabled && 'opacity-20'
    );
  }

  verticalLabelClasses(idx: number): string {
    const isStepDisabled = this.isStepDisabled(idx);
    return cn(
      'text-sm font-medium text-gray-900 whitespace-nowrap',
      isStepDisabled && 'opacity-20'
    );
  }
}
