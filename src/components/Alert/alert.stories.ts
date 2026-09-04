import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    tone: {
      control: 'select',
      options: ['soft', 'solid'],
    },
    showIcon: {
      control: 'boolean',
    },
    dismissible: {
      control: 'boolean',
    },
  },
  args: {
    size: 'base',
    tone: 'soft',
    showIcon: true,
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Info: Story = {
  args: {
    variant: 'info',
    showIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        The conference starts at 10:00 AM in Hall B. Don't be late!
      </ae-alert>
    `,
  }),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    showIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Your password will expire in 3 days. Consider updating it now.
      </ae-alert>
    `,
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
    showIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Your payment was processed successfully. Thank you!
      </ae-alert>
    `,
  }),
};

export const Error: Story = {
  args: {
    variant: 'error',
    showIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Unable to connect to the server. Please try again later or contact support.
      </ae-alert>
    `,
  }),
};

export const InfoWithIcon: Story = {
  args: {
    variant: 'info',
    showIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        The conference starts at 10:00 AM in Hall B. Don't be late!
      </ae-alert>
    `,
  }),
};

export const WarningWithIcon: Story = {
  args: {
    variant: 'warning',
    showIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Your password will expire in 3 days. Consider updating it now.
      </ae-alert>
    `,
  }),
};

export const SuccessWithIcon: Story = {
  args: {
    variant: 'success',
    showIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Your payment was processed successfully. Thank you!
      </ae-alert>
    `,
  }),
};

export const ErrorWithIcon: Story = {
  args: {
    variant: 'error',
    showIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Unable to connect to the server. Please try again later or contact support.
      </ae-alert>
    `,
  }),
};

export const WithTitle: Story = {
  args: {
    variant: 'error',
    title: 'There were 3 errors that were encountered regarding your registration',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        <ul class="list-disc mt-3 space-y-2 ps-4">
          <li>Your password must be at least 8 characters</li>
          <li>Your password must include at least 1 numeric value</li>
          <li>Your last name is blank. Kindly add your last name to proceed with the registration.</li>
        </ul>
      </ae-alert>
    `,
  }),
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    action: {
      text: 'Change password',
      href: '#',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Your password will expire in 3 days. Consider updating it now.
      </ae-alert>
    `,
  }),
};

export const WithDismiss: Story = {
  args: {
    variant: 'info',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        The conference starts at 10:00 AM in Hall B. Don't be late!
      </ae-alert>
    `,
  }),
};

export const Solid: Story = {
  args: {
    variant: 'error',
    tone: 'solid',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        Unable to connect to the server. Please try again later or contact support.
      </ae-alert>
    `,
  }),
};

export const Complex: Story = {
  args: {
    variant: 'error',
    title: 'Oh snap! there seems to be a road block',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        <p>So this is embarrassing, but looks that we have come across an unexpected situation causing a system error. We have logged this event and will be looking into fixing this.</p>
        <p class="mt-2">In the meantime, you may also report this as an error using our feedback system.</p>
        <div class="mt-6 flex items-center space-x-6">
          <a href="#" class="font-bold underline underline-offset-1 hover:underline hover:underline-offset-2">
            Report this error
          </a>
          <a href="#" class="font-bold underline underline-offset-1 hover:underline hover:underline-offset-2">
            Capture a screenshot
          </a>
        </div>
      </ae-alert>
    `,
  }),
};

export const DismissibleInfo: Story = {
  args: {
    variant: 'info',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        <p>This is an info alert that can be closed.</p>
      </ae-alert>
    `,
  }),
};

export const DismissibleError: Story = {
  args: {
    variant: 'error',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        <p>This is an error that can be closed. Please take necessary action if required.</p>
      </ae-alert>
    `,
  }),
};

export const DismissibleSuccess: Story = {
  args: {
    variant: 'success',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        <p>This is a success message that can be closed.</p>
      </ae-alert>
    `,
  }),
};

export const DismissibleWarning: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-alert
        [variant]="variant"
        [size]="size"
        [tone]="tone"
        [showIcon]="showIcon"
        [dismissible]="dismissible"
        [title]="title"
        [action]="action"
      >
        <p>This is a warning that can be closed. Please take necessary action if required.</p>
      </ae-alert>
    `,
  }),
};
