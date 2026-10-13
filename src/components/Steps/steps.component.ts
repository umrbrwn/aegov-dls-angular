import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

export interface StepItem {
  /** Label text (used for sr-only or step-text-below) */
  label: string;
  /** Optional href for the step badge link */
  href?: string;
}

export type StepsSize = 'sm' | 'base' | 'lg';
export type StepsOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ae-steps',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Progress" [class]="navClasses()">
      <ol
        role="list"
        [class.flex]="isHorizontal()"
        [class.items-center]="isHorizontal()"
        [class.justify-between]="isHorizontal()"
      >
        @for (step of steps(); track step.label; let idx = $index; let last = $last) {
          @if (isHorizontal()) {
            <!-- Horizontal Step -->
            <li
              class="relative"
              [class.w-full]="!last"
              [class.step-completed]="idx < currentStep()"
              [class.step-current]="idx === currentStep()"
              [class.step-upcoming]="idx > currentStep()"
            >
              <!-- Connector (not on last step) -->
              @if (!last) {
                <div class="step-connector" aria-hidden="true">
                  <div class="step-connector-state"></div>
                </div>
              }

              <!-- Badge -->
              <a
                [href]="step.href || '#'"
                class="step-badge"
                [attr.aria-current]="idx === currentStep() ? 'step' : null"
                (click)="onStepClick($event, idx)"
              >
                @if (!isCompleted(idx)) {
                  {{ idx + 1 }}
                }
                @if (showLabels()) {
                  <span class="step-text-below">{{ step.label }}</span>
                } @else {
                  <span class="sr-only">{{ step.label }}</span>
                }
              </a>
            </li>
          } @else {
            <!-- Vertical Step -->
            <li
              class="relative"
              [class.pb-10]="!last"
              [class.step-completed]="idx < currentStep()"
              [class.step-current]="idx === currentStep()"
              [class.step-upcoming]="idx > currentStep()"
            >
              <!-- Vertical connector (not on last step) -->
              @if (!last) {
                <div class="step-connector-state step-connector-vertical" aria-hidden="true"></div>
              }

              <a
                [href]="step.href || '#'"
                class="flex items-center group text-inherit no-underline"
                [attr.aria-current]="idx === currentStep() ? 'step' : null"
                (click)="onStepClick($event, idx)"
              >
                <span class="step-badge">
                  @if (!isCompleted(idx)) {
                    {{ idx + 1 }}
                  }
                </span>

                @if (showLabels()) {
                  <span class="ms-4 font-medium text-aeblack-900">{{ step.label }}</span>
                } @else {
                  <span class="sr-only">{{ step.label }}</span>
                }
              </a>
            </li>
          }
        }
      </ol>
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
  /**
   * Array of step items defining label and optional href
   */
  readonly steps = input<StepItem[]>([]);

  /**
   * Zero-based index of the currently active step
   */
  readonly currentStep = input<number>(0);

  /**
   * Size variant: 'sm' | 'base' | 'lg'
   */
  readonly size = input<StepsSize>('base');

  /**
   * Orientation: 'horizontal' | 'vertical'
   */
  readonly orientation = input<StepsOrientation>('horizontal');

  /**
   * Whether to show labels below each step badge
   */
  readonly showLabels = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional CSS classes forwarded to the nav wrapper
   */
  readonly className = input<string>('');

  /** Emits the index of a clicked step */
  readonly stepClick = output<number>();

  protected readonly isHorizontal = computed(() => this.orientation() === 'horizontal');

  protected readonly navClasses = computed(() => {
    const sz = this.size();
    return cn(
      'aegov-step',
      sz === 'sm' && 'step-sm',
      sz === 'lg' && 'step-lg',
      this.isHorizontal() && this.showLabels() && 'pb-9',
      !this.isHorizontal() && 'inline-block',
      this.className()
    );
  });

  /** Determine if a step index is completed (before currentStep) */
  protected isCompleted(idx: number): boolean {
    return idx < this.currentStep();
  }

  protected onStepClick(event: Event, idx: number): void {
    event.preventDefault();
    this.stepClick.emit(idx);
  }
}
