import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  TemplateRef,
  Type,
  inject,
  InjectionToken,
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  ViewChild,
  ViewContainerRef,
  Injector,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import {
  ModalComponent,
  type ModalSize,
  type ModalPlacement,
  type ModalVariant,
} from './modal.component';
import { IconDirective, type IconName } from '../Icon/icon.directive';
import { cn } from '../../utils/cn';

export const MODAL_DATA = new InjectionToken<unknown>('MODAL_DATA');

export type ModalActionVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'soft'
  | 'link'
  | 'danger'
  | string;

export interface ModalAction<R = unknown> {
  /** Optional identifier for the action */
  id?: string;
  /** Button label text */
  label: string;
  /** Visual button style */
  variant?: ModalActionVariant;
  /** Additional CSS classes for this button */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Result value passed to modalRef.close(value) when clicked */
  value?: R;
  /** Whether clicking this button automatically closes the modal. Defaults to true */
  closeOnClick?: boolean;
  /**
   * Custom click handler. If it returns false or a Promise resolving to false,
   * modal closing is cancelled.
   */
  onClick?: (
    modalRef: ModalRef<unknown, R>,
    event: MouseEvent
  ) => void | boolean | Promise<void | boolean>;
}

export interface ModalIconConfig {
  name: IconName | string;
  size?: number;
  className?: string;
  bgClassName?: string;
}

export interface ModalConfig<D = unknown, R = unknown> {
  /** Unique ID for the modal */
  id?: string;
  /** Maximum width sizing scale ('sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full') */
  size?: ModalSize;
  /** Visual variant ('default' | 'serious') */
  variant?: ModalVariant;
  /** Viewport alignment placement */
  placement?: ModalPlacement;
  /** Backdrop behavior ('dynamic' closes on backdrop click, 'static' does not) */
  backdrop?: 'dynamic' | 'static';
  /** Whether backdrop overlay is visible */
  showBackdrop?: boolean;
  /** Whether top-end close 'X' button is displayed */
  showCloseButton?: boolean;
  /** Whether Escape key dismisses the modal */
  closeOnEscape?: boolean;
  /** Accessible aria-label for close button */
  closeAriaLabel?: string;
  /** Custom wrapper background class */
  wrapperBgClass?: string;
  /** Additional CSS class for outer modal container */
  className?: string;
  /** Additional CSS class for inner dialog box */
  dialogClassName?: string;
  /** Reading direction ('ltr' | 'rtl') */
  dir?: 'ltr' | 'rtl';

  /** Modal title heading */
  title?: string;
  /** Optional custom CSS classes for the title */
  titleClassName?: string;

  /** Optional leading icon name or icon configuration */
  icon?: IconName | string | ModalIconConfig;

  /** Text or HTML body content */
  body?: string;
  /** Angular Component to dynamically mount inside the modal body */
  component?: Type<unknown>;
  /** Angular TemplateRef to dynamically mount inside the modal body */
  template?: TemplateRef<{ $implicit: D; modalRef: ModalRef<unknown, R> }>;

  /** Action buttons (1, 2, 3, 4, etc.) */
  actions?: ModalAction<R>[];
  /** Custom CSS classes for the actions container */
  actionsClassName?: string;

  /** Arbitrary payload data passed to component/template or accessible via MODAL_DATA */
  data?: D;
}

export class ModalRef<T = unknown, R = unknown> {
  private readonly closed$ = new Subject<R | undefined>();

  constructor(private readonly destroyFn: () => void) {}

  data?: unknown;
  componentInstance?: T;

  /**
   * Observable emitting the result value when closed or undefined when dismissed.
   */
  afterClosed(): Observable<R | undefined> {
    return this.closed$.asObservable();
  }

  /**
   * Closes the modal with an optional return value.
   */
  close(result?: R): void {
    this.closed$.next(result);
    this.closed$.complete();
    this.destroyFn();
  }

  /**
   * Dismisses the modal without a result.
   */
  dismiss(): void {
    this.closed$.next(undefined);
    this.closed$.complete();
    this.destroyFn();
  }
}

@Component({
  selector: 'ae-modal-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [attr.dir]="config().dir || null" [class.font-notokufi]="config().dir === 'rtl'">
      <ae-modal
        #modal
        [id]="config().id"
        [isOpen]="isOpen()"
        [size]="resolvedSize()"
        [variant]="config().variant || 'default'"
        [placement]="config().placement || 'center'"
        [backdrop]="config().backdrop || 'dynamic'"
        [showBackdrop]="config().showBackdrop ?? true"
        [showCloseButton]="config().showCloseButton ?? (!hasActions() || !!config().component || !!config().template)"
        [closeOnEscape]="config().closeOnEscape ?? true"
        [closeAriaLabel]="config().closeAriaLabel"
        [wrapperBgClass]="config().wrapperBgClass || ''"
        [className]="config().className || ''"
        [dialogClassName]="config().dialogClassName || ''"
        (close)="onModalClose()"
      >
        <div>
          @if (hasIcon()) {
            <!-- Layout with leading Icon Badge -->
            <div class="sm:flex sm:items-start">
              <div [class]="iconWrapperClasses()">
                <svg
                  aeIcon
                  [name]="resolvedIconName()"
                  [size]="resolvedIconSize()"
                  [className]="resolvedIconClasses()"
                ></svg>
              </div>

              <div
                class="mt-4 text-center sm:ms-6 sm:mt-0 flex-1"
                [class.sm:text-right]="config().dir === 'rtl'"
                [class.sm:text-left]="config().dir !== 'rtl'"
              >
                @if (config().title) {
                  <h3 [class]="titleClasses()">
                    {{ config().title }}
                  </h3>
                }

                @if (config().body) {
                  <div class="mt-4">
                    <div
                      [innerHTML]="config().body"
                      class="text-base font-normal text-aeblack-800 leading-relaxed"
                    ></div>
                  </div>
                }

                <!-- Dynamic Component / Template insertion point -->
                <ng-container #vcHost></ng-container>
              </div>
            </div>
          } @else {
            <!-- Standard Full-Width Layout -->
            <div>
              @if (config().title) {
                <h2 [class]="titleClasses()">
                  {{ config().title }}
                </h2>
              }

              @if (config().body) {
                <div
                  [innerHTML]="config().body"
                  class="text-base font-normal text-aeblack-800 leading-relaxed mb-4"
                ></div>
              }

              <!-- Dynamic Component / Template insertion point -->
              <ng-container #vcHost></ng-container>
            </div>
          }

          <!-- Dynamic Action Buttons (1, 2, 3, 4+) -->
          @if (hasActions()) {
            <div [class]="actionsContainerClasses()">
              @for (action of config().actions; track $index) {
                <button
                  type="button"
                  [disabled]="action.disabled"
                  [class]="getActionButtonClasses(action)"
                  (click)="handleActionClick(action, $event)"
                >
                  {{ action.label }}
                </button>
              }
            </div>
          }
        </div>
      </ae-modal>
    </div>
  `,
})
export class ModalContainerComponent {
  @ViewChild('vcHost', { read: ViewContainerRef }) vcHost?: ViewContainerRef;

  readonly isOpen = signal<boolean>(true);
  readonly config = signal<ModalConfig<unknown, unknown>>({});

  modalRef?: ModalRef<unknown, unknown>;

  protected readonly hasActions = computed(() => {
    const actions = this.config().actions;
    return !!actions && actions.length > 0;
  });

  protected readonly resolvedSize = computed<ModalSize>(() => {
    const cfg = this.config();
    if (cfg.size) return cfg.size;
    if (cfg.variant === 'serious') return '2xl';
    return 'lg';
  });

  protected readonly hasIcon = computed(() => {
    return !!this.config().icon;
  });

  protected readonly resolvedIconName = computed(() => {
    const icon = this.config().icon;
    if (!icon) return '';
    if (typeof icon === 'string') return icon;
    return icon.name;
  });

  protected readonly resolvedIconSize = computed(() => {
    const icon = this.config().icon;
    if (icon && typeof icon === 'object' && icon.size) return icon.size;
    return 28;
  });

  protected readonly iconWrapperClasses = computed(() => {
    const icon = this.config().icon;
    if (icon && typeof icon === 'object' && icon.bgClassName) {
      return cn(
        'mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0',
        icon.bgClassName
      );
    }

    const isSerious = this.config().variant === 'serious';
    const name = this.resolvedIconName();

    if (isSerious || name === 'warning' || name === 'x-circle') {
      return 'bg-aered-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0';
    }
    if (name === 'check-circle' || name === 'check') {
      return 'bg-aegreen-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0';
    }
    return 'bg-primary-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0';
  });

  protected readonly resolvedIconClasses = computed(() => {
    const icon = this.config().icon;
    if (icon && typeof icon === 'object' && icon.className) {
      return icon.className;
    }

    const isSerious = this.config().variant === 'serious';
    const name = this.resolvedIconName();

    if (isSerious || name === 'warning' || name === 'x-circle') {
      return 'text-aered-600';
    }
    if (name === 'check-circle' || name === 'check') {
      return 'text-aegreen-600';
    }
    return 'text-primary-700';
  });

  protected readonly titleClasses = computed(() => {
    const custom = this.config().titleClassName;
    if (custom) return custom;
    if (this.hasIcon()) {
      return 'text-lg font-bold text-aeblack-950';
    }
    return 'text-2xl font-semibold mb-4 sm:mb-6 text-aeblack-950';
  });

  protected readonly actionsContainerClasses = computed(() => {
    const cfg = this.config();
    const count = cfg.actions?.length ?? 0;

    // Single action
    if (count === 1) {
      return cn(
        'mt-6 md:mt-7 xl:mt-8 flex justify-end',
        cfg.dir === 'rtl' ? 'sm:justify-start' : 'sm:justify-end',
        cfg.actionsClassName
      );
    }

    // Two actions (standard confirmation layout with flex-row-reverse for natural primary on the end)
    if (count === 2) {
      return cn(
        'mt-6 md:mt-7 xl:mt-8 flex flex-col-reverse sm:flex-row-reverse gap-3',
        cfg.dir === 'rtl' ? 'sm:mr-auto' : 'sm:ml-auto',
        cfg.actionsClassName
      );
    }

    // 3, 4, or more actions
    return cn(
      'mt-6 md:mt-7 xl:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-end items-stretch sm:items-center',
      cfg.actionsClassName
    );
  });

  protected getActionButtonClasses(action: ModalAction<unknown>): string {
    const v = action.variant || 'primary';
    const isSerious = this.config().variant === 'serious';

    let variantClass = '';
    switch (v) {
      case 'secondary':
        variantClass = 'btn-secondary';
        break;
      case 'outline':
        variantClass = 'btn-outline';
        break;
      case 'soft':
        variantClass = 'btn-soft';
        break;
      case 'link':
        variantClass = 'btn-link';
        break;
      case 'danger':
        variantClass = isSerious ? '' : 'btn-danger bg-aered-600 text-white hover:bg-aered-700';
        break;
      case 'primary':
      default:
        variantClass = '';
        break;
    }

    return cn(
      'aegov-btn w-full sm:w-auto',
      variantClass,
      action.className
    );
  }

  protected async handleActionClick(
    action: ModalAction<unknown>,
    event: MouseEvent
  ): Promise<void> {
    if (action.disabled) return;

    if (action.onClick) {
      const shouldProceed = await action.onClick(
        this.modalRef as ModalRef<unknown, unknown>,
        event
      );
      if (shouldProceed === false) {
        return;
      }
    }

    if (action.closeOnClick !== false) {
      this.modalRef?.close(action.value);
    }
  }

  protected onModalClose(): void {
    this.modalRef?.dismiss();
  }
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  /**
   * General modal mounting method.
   *
   * Mounts a modal dynamically given a `ModalConfig` object, an Angular `TemplateRef`,
   * or a standalone Component `Type<T>`.
   */
  open<T = unknown, R = unknown>(
    contentOrConfig:
      | ModalConfig<unknown, R>
      | TemplateRef<{ $implicit: unknown; modalRef: ModalRef<T, R> }>
      | Type<T>,
    options?: Partial<ModalConfig<unknown, R>>
  ): ModalRef<T, R> {
    let resolvedConfig: ModalConfig<unknown, R>;

    if (contentOrConfig instanceof TemplateRef) {
      resolvedConfig = {
        ...options,
        template: contentOrConfig as unknown as TemplateRef<{
          $implicit: unknown;
          modalRef: ModalRef<unknown, R>;
        }>,
      };
    } else if (typeof contentOrConfig === 'function') {
      resolvedConfig = {
        ...options,
        component: contentOrConfig as Type<unknown>,
      };
    } else {
      resolvedConfig = {
        ...contentOrConfig,
        ...options,
      };
    }

    const hostEl = this.document.createElement('div');
    this.document.body.appendChild(hostEl);

    let modalRefInstance!: ModalRef<T, R>;

    const componentRef = createComponent(ModalContainerComponent, {
      environmentInjector: this.injector,
      hostElement: hostEl,
    });

    const destroy = () => {
      componentRef.instance.isOpen.set(false);
      setTimeout(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        hostEl.remove();
      }, 150);
    };

    modalRefInstance = new ModalRef<T, R>(destroy);
    modalRefInstance.data = resolvedConfig.data;

    componentRef.instance.config.set(resolvedConfig as ModalConfig<unknown, unknown>);
    componentRef.instance.modalRef = modalRefInstance as ModalRef<unknown, unknown>;

    this.appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();

    const vc = componentRef.instance.vcHost;
    if (vc) {
      if (resolvedConfig.template) {
        vc.createEmbeddedView(resolvedConfig.template, {
          $implicit: resolvedConfig.data,
          modalRef: modalRefInstance,
        });
      } else if (resolvedConfig.component) {
        const customInjector = Injector.create({
          providers: [
            { provide: MODAL_DATA, useValue: resolvedConfig.data },
            { provide: ModalRef, useValue: modalRefInstance },
          ],
          parent: this.injector,
        });

        const customCompRef = vc.createComponent(resolvedConfig.component, {
          injector: customInjector,
        });
        modalRefInstance.componentInstance = customCompRef.instance as T;
      }
      componentRef.changeDetectorRef.detectChanges();
    }

    return modalRefInstance;
  }
}
