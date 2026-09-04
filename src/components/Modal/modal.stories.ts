import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../Button/button.component';
import { IconComponent } from '../Icon/icon.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, ButtonComponent, IconComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Modal Title',
    size: 'md',
    variant: 'default',
    closeOnBackdrop: true,
    isOpen: false,
  },
  argTypes: {
    title: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'danger'],
    },
    closeOnBackdrop: {
      control: 'boolean',
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Simple: Story = {
  args: {
    title: 'Hello',
    size: 'md',
    variant: 'default',
    closeOnBackdrop: true,
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-modal [title]="title" [size]="size" [variant]="variant" [closeOnBackdrop]="closeOnBackdrop" [isOpen]="isOpen">
        <ae-button trigger variant="solid">Open Modal</ae-button>
        <div class="space-y-4">
          <p class="text-gray-600">To close the modal, you can use any of the following methods:</p>
          <ul class="list-decimal space-y-2 ml-4 text-gray-600">
            <li>Press the "ESC" key on your keyboard</li>
            <li>Click the close button</li>
            <li>Click outside the modal</li>
          </ul>
        </div>
      </ae-modal>
    `,
  }),
};

export const Success: Story = {
  args: {
    size: 'sm',
    variant: 'default',
    closeOnBackdrop: true,
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-modal [size]="size" [variant]="variant" [closeOnBackdrop]="closeOnBackdrop" [isOpen]="isOpen" #modalRef>
        <ae-button trigger variant="solid">Success Modal</ae-button>
        <div class="text-center">
          <div class="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <ae-icon name="check" [size]="24" class="text-green-600"></ae-icon>
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">Payment successful</h3>
          <p class="mt-2 text-gray-600">
            Your payment has been successfully processed
          </p>
          <ae-button (click)="modalRef.closeModal()" class="w-full mt-6" variant="solid">Continue</ae-button>
        </div>
      </ae-modal>
    `,
  }),
};

export const Alert: Story = {
  args: {
    size: 'md',
    variant: 'danger',
    closeOnBackdrop: true,
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-modal [size]="size" [variant]="variant" [closeOnBackdrop]="closeOnBackdrop" [isOpen]="isOpen" #alertModalRef>
        <ae-button trigger variant="outline">Alert Modal</ae-button>
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
            <ae-icon name="warning" [size]="24" class="text-red-600"></ae-icon>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left rtl:text-right sm:rtl:ml-0 sm:rtl:mr-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Deactivate account
            </h3>
            <p class="mt-2 text-gray-600">
              Are you sure you want to deactivate your account? All of your data will be permanently removed.
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <ae-button (click)="alertModalRef.closeModal()" variant="soft">Cancel</ae-button>
          <ae-button (click)="alertModalRef.closeModal()" variant="solid">Deactivate</ae-button>
        </div>
      </ae-modal>
    `,
  }),
};

export const BottomRight: Story = {
  args: {
    title: 'Deactivate account',
    size: 'xl',
    variant: 'default',
    closeOnBackdrop: true,
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-modal
        [title]="title"
        dialogClass="left-auto! right-6! top-auto! bottom-6! translate-x-0! translate-y-0!"
        [size]="size"
        [variant]="variant"
        [closeOnBackdrop]="closeOnBackdrop"
        [isOpen]="isOpen"
        #brModalRef
      >
        <ae-button trigger variant="solid">Open Bottom Right Modal</ae-button>
        <div class="flex items-start">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100">
            <ae-icon name="check" [size]="24" class="text-yellow-700"></ae-icon>
          </div>
          <div class="ml-4 rtl:mr-4 rtl:ml-0">
            <h3 class="text-lg font-semibold text-yellow-900">Deactivate account</h3>
            <p class="mt-2 text-yellow-800">
              Are you sure you want to deactivate your account? Our site enables scripts (e.g. cookies) that are able to read, store, and write information on your browser and device.
            </p>
            <p class="mt-4 text-yellow-800">
              We use this information for various purposes - e.g. to deliver content, maintain security, enable user choice, improve our sites, and for marketing purposes.
            </p>
          </div>
        </div>
        <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <ae-button (click)="brModalRef.closeModal()" variant="outline">Deny and quit</ae-button>
          <ae-button (click)="brModalRef.closeModal()" variant="solid">Allow all and accept</ae-button>
        </div>
      </ae-modal>
    `,
  }),
};
