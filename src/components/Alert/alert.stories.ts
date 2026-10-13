import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertComponent, type AlertVariant, type AlertTone } from './alert.component';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AlertComponent, IconDirective],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning'] as AlertVariant[],
      description: 'The color and semantic type of the alert',
    },
    tone: {
      control: 'select',
      options: ['soft', 'solid'] as AlertTone[],
      description: 'The visual tone/contrast level of the alert',
    },
    title: {
      control: 'text',
      description: 'Header title text inside the alert content',
    },
    content: {
      control: 'text',
      description: 'Main body message of the alert',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to display the cue icon',
    },
    icon: {
      control: 'text',
      description: 'Custom icon name override from the icon registry',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert has a dismiss close button',
    },
    linkText: {
      control: 'text',
      description: 'Action link label text',
    },
    linkHref: {
      control: 'text',
      description: 'Action link destination URL',
    },
  },
  args: {
    variant: 'info',
    tone: 'soft',
    title: '',
    content: 'The conference starts at 10:00 AM in Hall B. Don\'t be late!',
    showIcon: true,
    icon: '',
    dismissible: false,
    linkText: '',
    linkHref: '#',
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      icon: args.icon || undefined,
      title: args.title || undefined,
      linkText: args.linkText || undefined,
    },
    template: `
      <ae-alert
        [variant]="variant"
        [tone]="tone"
        [title]="title"
        [content]="content"
        [showIcon]="showIcon"
        [icon]="icon"
        [dismissible]="dismissible"
        [linkText]="linkText"
        [linkHref]="linkHref"
      ></ae-alert>
    `,
  }),
};

export const SoftVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-4">
        <ae-alert variant="info" content="The conference starts at 10:00 AM in Hall B. Don't be late!" [showIcon]="false"></ae-alert>
        <ae-alert variant="error" content="Unable to connect to the server. Please try again later or contact support." [showIcon]="false"></ae-alert>
        <ae-alert variant="success" content="Your payment was processed successfully. Thank you!" [showIcon]="false"></ae-alert>
        <ae-alert variant="warning" content="Your password will expire in 3 days. Consider updating it now." [showIcon]="false"></ae-alert>
      </div>
    `,
  }),
};

export const SolidVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-4">
        <ae-alert variant="info" tone="solid" content="The conference starts at 10:00 AM in Hall B. Don't be late!" [showIcon]="false"></ae-alert>
        <ae-alert variant="error" tone="solid" content="Unable to connect to the server. Please try again later or contact support." [showIcon]="false"></ae-alert>
        <ae-alert variant="success" tone="solid" content="Your payment was processed successfully. Thank you!" [showIcon]="false"></ae-alert>
        <ae-alert variant="warning" tone="solid" content="Your password will expire in 3 days. Consider updating it now." [showIcon]="false"></ae-alert>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-4">
        <ae-alert variant="info" content="The conference starts at 10:00 AM in Hall B. Don't be late!" [showIcon]="true"></ae-alert>
        <ae-alert variant="error" content="Unable to connect to the server. Please try again later or contact support." [showIcon]="true"></ae-alert>
        <ae-alert variant="success" content="Your payment was processed successfully. Thank you!" [showIcon]="true"></ae-alert>
        <ae-alert variant="warning" content="Your password will expire in 3 days. Consider updating it now." [showIcon]="true"></ae-alert>
      </div>
    `,
  }),
};

export const WithIconAndLink: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-4">
        <ae-alert
          variant="info"
          content="The conference starts at 10:00 AM in Hall B. Don't be late!"
          linkText="Remind me"
          linkHref="#"
        ></ae-alert>
        <ae-alert
          variant="error"
          content="Unable to connect to the server. Please try again later or contact support."
          linkText="Details"
          linkHref="#"
        ></ae-alert>
        <ae-alert
          variant="success"
          content="Your payment was processed successfully. Thank you!"
          linkText="View invoice"
          linkHref="#"
        ></ae-alert>
        <ae-alert
          variant="warning"
          content="Your password will expire in 3 days. Consider updating it now."
          linkText="Change password"
          linkHref="#"
        ></ae-alert>
      </div>
    `,
  }),
};

export const WithAdditionalContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-6">
        <ae-alert variant="error" [showIcon]="true">
          <div class="alert-title">Oh snap! there seems to be a road block</div>
          <p>So this is embarrassing, but looks that we have come across an unexpected situation causing a system error. We have logged this event and will be looking into fixing this.</p>
          <p class="mt-2">In the meantime, you may also report this as an error using our feedback system.</p>
          <div class="alert-footer">
            <a href="#">Report this error</a>
            <a href="#">Capture a screenshot</a>
          </div>
        </ae-alert>

        <ae-alert variant="info" [showIcon]="true">
          <div class="alert-title">Scheduled maintenance notice</div>
          <p>Our online services will undergo regular system maintenance on Saturday between 02:00 AM and 04:00 AM GST.</p>
          <div class="alert-footer">
            <a href="#">View maintenance schedule</a>
            <a href="#">Contact technical support</a>
          </div>
        </ae-alert>
      </div>
    `,
  }),
};

export const WithList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-alert variant="error" [showIcon]="true">
        <div class="alert-title">There were 3 errors encountered regarding your registration:</div>
        <ul class="list-disc list-inside space-y-1 mt-2 text-sm">
          <li>Your password must be at least 8 characters</li>
          <li>Your password must include at least 1 numeric value</li>
          <li>Your last name is blank. Kindly add your last name to proceed with the registration.</li>
        </ul>
      </ae-alert>
    `,
  }),
};

export const Dismissible: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-4">
        <ae-alert
          variant="info"
          [dismissible]="true"
          content="This is a temporary notification that can be dismissed. Please take necessary action if required."
        ></ae-alert>
        <ae-alert
          variant="error"
          [dismissible]="true"
          content="This is an error notification that can be closed by clicking the close button."
        ></ae-alert>
        <ae-alert
          variant="success"
          [dismissible]="true"
          content="Your profile updates have been saved. You can close this banner."
        ></ae-alert>
        <ae-alert
          variant="warning"
          [dismissible]="true"
          content="Your session is about to expire in 5 minutes. Save your changes."
        ></ae-alert>
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
      <div class="space-y-6">
        <!-- LTR Container -->
        <div dir="ltr" class="p-4 border border-gray-200 rounded-lg">
          <div class="text-xs font-bold text-gray-500 uppercase mb-3">LTR Layout</div>
          <ae-alert
            variant="info"
            content="The conference starts at 10:00 AM in Hall B. Don't be late!"
            linkText="Remind me"
            [dismissible]="true"
          ></ae-alert>
        </div>

        <!-- RTL Container with Arabic text -->
        <div dir="rtl" class="p-4 border border-primary-200 bg-primary-50/10 rounded-lg">
          <div class="text-xs font-bold text-primary-700 uppercase mb-3">تخطيط من اليمين إلى اليسار (RTL)</div>
          <ae-alert
            variant="error"
            title="يبدو أن هناك خطأ مصادفة"
            content="تمت مصادفة خطأ نظام غير متوقع تسبب في عدم تحميل الصفحة المقصود. لقد سجلنا هذا الخطأ وسنبحث في إصلاحه في أقرب وقت ممكن."
            linkText="أبلغ عن هذا الخطأ"
            [dismissible]="true"
          ></ae-alert>
        </div>
      </div>
    `,
  }),
};
