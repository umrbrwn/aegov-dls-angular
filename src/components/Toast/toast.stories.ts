import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ButtonComponent } from '../Button/button.component';

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, ToastComponent],
      providers: [ToastService],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    duration: 5000,
    showToast: false,
  },
  argTypes: {
    duration: {
      control: 'number',
    },
    showToast: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Default: Story = {
  args: {
    duration: 5000,
    showToast: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex flex-col items-center gap-4">
        <ae-button (click)="toast.openToast()" variant="solid">Show Toast</ae-button>
        <ae-toast [duration]="duration" [showToast]="showToast" #toast>
          <div class="text-gray-900 font-semibold text-sm">
            Simple toast message
          </div>
        </ae-toast>
      </div>
    `,
  }),
};

export const WithDescription: Story = {
  args: {
    duration: 5000,
    showToast: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex flex-col items-center gap-4">
        <ae-button (click)="toast.openToast()" variant="solid">Show Toast</ae-button>
        <ae-toast [duration]="duration" [showToast]="showToast" #toast>
          <div class="text-gray-900 font-semibold text-sm mb-1">
            File Deleted
          </div>
          <div class="text-gray-600 text-sm">
            The file has been moved to trash.
          </div>
        </ae-toast>
      </div>
    `,
  }),
};

export const WithAction: Story = {
  args: {
    duration: 5000,
    showToast: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex flex-col items-center gap-4">
        <ae-button (click)="toast.openToast()" variant="solid">Show Toast</ae-button>
        <ae-toast [duration]="duration" [showToast]="showToast" #toast>
          <div class="text-gray-900 font-semibold text-sm mb-1">
            Changes saved
          </div>
          <div class="text-gray-600 text-sm mb-3">
            Your changes have been saved successfully.
          </div>
          <button
            type="button"
            (click)="toast.closeToast()"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Undo
          </button>
        </ae-toast>
      </div>
    `,
  }),
};

export const Error: Story = {
  args: {
    duration: 6000,
    showToast: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex flex-col items-center gap-4">
        <ae-button (click)="toast.openToast()" variant="solid">Show Toast</ae-button>
        <ae-toast [duration]="duration" [showToast]="showToast" #toast>
          <div class="text-gray-900 font-semibold text-sm mb-1">
            Error
          </div>
          <div class="text-gray-600 text-sm mb-3">
            Something went wrong. Please try again.
          </div>
          <button
            type="button"
            (click)="toast.closeToast()"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </ae-toast>
      </div>
    `,
  }),
};
