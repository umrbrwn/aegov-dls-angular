import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { ToastComponent } from './toast.component';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ToastComponent, IconDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'toast-demo',
    title: 'John Doe',
    message: 'Hi John, thanks for sharing your feedback regarding TDRA.',
    icon: 'info',
    iconColor: 'text-primary-600',
    iconSize: 32,
    actionText: 'Replay',
    actionHref: undefined,
    dismissible: true,
    dismissAriaLabel: 'Close',
    show: true,
    className: '',
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique ID for toast identification',
    },
    title: {
      control: 'text',
      description: 'Toast main title / header text',
    },
    message: {
      control: 'text',
      description: 'Toast message body description',
    },
    icon: {
      control: 'select',
      options: ['info', 'check-circle', 'x-circle', 'warning', 'bell-simple'],
      description: 'Icon name displayed in toast-icon wrapper',
    },
    iconColor: {
      control: 'text',
      description: 'CSS color class for icon',
    },
    iconSize: {
      control: 'number',
      description: 'Icon size in pixels',
    },
    actionText: {
      control: 'text',
      description: 'Action button text',
    },
    actionHref: {
      control: 'text',
      description: 'Optional href for action link',
    },
    dismissible: {
      control: 'boolean',
      description: 'Shows or hides the dismiss close button',
    },
    dismissAriaLabel: {
      control: 'text',
      description: 'Accessible aria-label for dismiss button',
    },
    show: {
      control: 'boolean',
      description: 'Visibility toggle of toast',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      id: args.id || undefined,
      title: args.title || undefined,
      message: args.message || undefined,
      icon: args.icon || undefined,
      actionText: args.actionText || undefined,
      actionHref: args.actionHref || undefined,
    },
    template: `
      <div class="p-6">
        <ae-toast
          [id]="id"
          [title]="title"
          [message]="message"
          [icon]="icon"
          [iconColor]="iconColor"
          [iconSize]="iconSize"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [dismissAriaLabel]="dismissAriaLabel"
          [show]="show"
          [className]="className"
        ></ae-toast>
      </div>
    `,
  }),
};

export const WithoutActionButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6">
        <ae-toast
          title="Update Available"
          message="A new version of the portal is now available. Please refresh your browser."
          icon="info"
        ></ae-toast>
      </div>
    `,
  }),
};

export const WithoutIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6">
        <ae-toast
          title="System Notification"
          message="Your request #49281 has been successfully processed."
          [icon]="undefined"
          actionText="View Details"
        ></ae-toast>
      </div>
    `,
  }),
};

export const NotificationTypes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 space-y-4">
        <!-- Success Toast -->
        <ae-toast
          title="Success"
          message="Your changes have been saved successfully."
          icon="check-circle"
          iconColor="text-aegreen-600"
          actionText="Undo"
        ></ae-toast>

        <!-- Error Toast -->
        <ae-toast
          title="Connection Error"
          message="Unable to connect to the server. Please check your internet connection."
          icon="x-circle"
          iconColor="text-aered-600"
          actionText="Retry"
        ></ae-toast>

        <!-- Warning Toast -->
        <ae-toast
          title="Storage Warning"
          message="Your document cloud storage is 90% full."
          icon="warning"
          iconColor="text-camel-600"
          actionText="Upgrade"
        ></ae-toast>

        <!-- Info Toast -->
        <ae-toast
          title="Information"
          message="Scheduled maintenance will take place tonight at 12:00 AM."
          icon="info"
          iconColor="text-primary-600"
        ></ae-toast>
      </div>
    `,
  }),
};

export const RtlSupport: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 space-y-4" dir="rtl">
        <ae-toast
          title="جون دو"
          message="مرحبًا جون، شكرًا لمشاركتك ملاحظاتك بخصوص TDRA."
          icon="info"
          actionText="إعادة الإرسال"
        ></ae-toast>

        <ae-toast
          title="تم الحفظ بنجاح"
          message="تم إرسال نموذج الطلب الخاص بك بنجاح إلى الجهة المعنية."
          icon="check-circle"
          iconColor="text-aegreen-600"
          actionText="عرض الطلب"
        ></ae-toast>
      </div>
    `,
  }),
};

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../Button/button.directive';
import { ToastService } from './toast.service';

@Component({
  selector: 'ae-toast-demo',
  standalone: true,
  imports: [CommonModule, ToastComponent, ButtonDirective],
  template: `
    <div class="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 class="text-2xl font-bold text-aeblack-950 mb-2">Toast Notifications Demo</h2>
        <p class="text-base text-aeblack-600">
          Toasts can be triggered programmatically via <code>ToastService</code> or rendered declaratively using <code>&lt;ae-toast&gt;</code>.
        </p>
      </div>

      <!-- Programmatic Service Demos -->
      <div class="border border-aegov-border rounded-xl p-6 bg-white shadow-sm space-y-6">
        <div>
          <h3 class="text-lg font-bold text-aeblack-900 mb-1">1. Programmatic Usage (ToastService)</h3>
          <p class="text-sm text-aeblack-500">Click any button below to trigger toasts positioned across the screen.</p>
        </div>

        <div class="space-y-4">
          <div class="text-xs font-semibold uppercase tracking-wider text-aeblack-400">Variant Triggers</div>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              aeButton
              size="sm"
              (click)="showSuccess()"
            >
              Success Toast
            </button>
            <button
              type="button"
              aeButton
              size="sm"
              (click)="showError()"
            >
              Error Toast
            </button>
            <button
              type="button"
              aeButton
              size="sm"
              (click)="showWarning()"
            >
              Warning Toast
            </button>
            <button
              type="button"
              aeButton
              size="sm"
              (click)="showInfo()"
            >
              Info Toast
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div class="text-xs font-semibold uppercase tracking-wider text-aeblack-400">Interactive & Positions</div>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              aeButton
              variant="soft"
              size="sm"
              (click)="showActionToast()"
            >
              Toast with Action (Undo)
            </button>
            <button
              type="button"
              aeButton
              variant="soft"
              size="sm"
              (click)="showTopRightToast()"
            >
              Top-Right Toast
            </button>
            <button
              type="button"
              aeButton
              variant="soft"
              size="sm"
              (click)="showBottomCenterToast()"
            >
              Bottom-Center Toast
            </button>
            <button
              type="button"
              aeButton
              variant="soft"
              size="sm"
              (click)="showRtlToast()"
            >
              RTL Toast (عربي)
            </button>
            <button
              type="button"
              aeButton
              variant="outline"
              size="sm"
              class="text-aered-600 border-aered-300 hover:bg-aered-50"
              (click)="clearAll()"
            >
              Clear All Toasts
            </button>
          </div>
        </div>

        @if (lastAction()) {
          <div class="p-3 bg-primary-50 border border-primary-200 rounded-lg text-sm text-primary-900 font-medium">
            {{ lastAction() }}
          </div>
        }
      </div>

      <!-- Declarative Component Demos -->
      <div class="border border-aegov-border rounded-xl p-6 bg-white shadow-sm space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-aeblack-900 mb-1">2. Declarative Usage (&lt;ae-toast&gt;)</h3>
            <p class="text-sm text-aeblack-500">Embedded directly within component templates.</p>
          </div>
          <button
            type="button"
            aeButton
            variant="soft"
            size="sm"
            (click)="declarativeVisible.set(!declarativeVisible())"
          >
            {{ declarativeVisible() ? 'Hide Declarative Toast' : 'Show Declarative Toast' }}
          </button>
        </div>

        @if (declarativeVisible()) {
          <div class="flex flex-col sm:flex-row gap-4">
            <ae-toast
              title="Declarative Alert"
              message="This toast is rendered directly inside the template markup."
              icon="check-circle"
              iconColor="text-aegreen-600"
              actionText="Action"
              (actionClick)="onDeclarativeAction()"
              (dismiss)="declarativeVisible.set(false)"
            ></ae-toast>

            <ae-toast
              title="System Notice"
              message="Always visible static notification card."
              icon="info"
              iconColor="text-primary-600"
              [dismissible]="false"
            ></ae-toast>
          </div>
        }
      </div>
    </div>
  `,
})
export class ToastDemoComponent {
  private readonly toastService = inject(ToastService);
  readonly declarativeVisible = signal<boolean>(true);
  readonly lastAction = signal<string>('');

  showSuccess(): void {
    this.toastService.success('Your changes have been saved successfully.', 'Success');
  }

  showError(): void {
    this.toastService.error('Unable to connect to the server. Please try again.', 'Connection Error');
  }

  showWarning(): void {
    this.toastService.warning('Your cloud storage is 90% full.', 'Storage Warning');
  }

  showInfo(): void {
    this.toastService.info('Scheduled maintenance tonight at 12:00 AM.', 'System Information');
  }

  showActionToast(): void {
    this.toastService.show({
      title: 'Item Deleted',
      message: 'The file has been moved to trash.',
      icon: 'x-circle',
      iconColor: 'text-aered-600',
      actionText: 'Undo',
      duration: 6000,
      onAction: () => {
        this.lastAction.set(`Action clicked at ${new Date().toLocaleTimeString()} - Item restored!`);
        this.toastService.info('Deletion undone successfully.', 'Restored');
      },
    });
  }

  showTopRightToast(): void {
    this.toastService.show({
      title: 'Top-Right Notification',
      message: 'This notification is pinned to the top right of the viewport.',
      icon: 'bell-simple',
      iconColor: 'text-primary-600',
      position: 'top-right',
    });
  }

  showBottomCenterToast(): void {
    this.toastService.show({
      title: 'Bottom-Center Notification',
      message: 'Centered at the bottom of the viewport.',
      icon: 'info',
      iconColor: 'text-primary-600',
      position: 'bottom-center',
    });
  }

  showRtlToast(): void {
    this.toastService.show({
      title: 'تم الحفظ بنجاح',
      message: 'تم إرسال نموذج الطلب الخاص بك بنجاح إلى الجهة المعنية.',
      icon: 'check-circle',
      iconColor: 'text-aegreen-600',
      actionText: 'عرض الطلب',
      dir: 'rtl',
      onAction: () => {
        this.lastAction.set(`تم النقر على عرض الطلب في ${new Date().toLocaleTimeString()}`);
      },
    });
  }

  clearAll(): void {
    this.toastService.clear();
    this.lastAction.set('All toasts cleared.');
  }

  onDeclarativeAction(): void {
    this.lastAction.set(`Declarative toast action clicked at ${new Date().toLocaleTimeString()}`);
  }
}

export const ServiceAndDeclarativeDemo: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    moduleMetadata: {
      imports: [ToastDemoComponent],
    },
    template: `
      <ae-toast-demo></ae-toast-demo>
    `,
  }),
};

