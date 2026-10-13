import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BannerComponent, type BannerPosition, type BannerVariant } from './banner.component';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<BannerComponent> = {
  title: 'Components/Banner',
  component: BannerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BannerComponent, IconDirective],
    }),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'static'] as BannerPosition[],
      description: 'Positioning of the banner',
    },
    variant: {
      control: 'select',
      options: ['default', 'camel', 'red', 'dark', 'notice-primary', 'notice-secondary'] as BannerVariant[],
      description: 'The visual and semantic variant of the banner',
    },
    title: {
      control: 'text',
      description: 'Optional headline/title of the banner',
    },
    content: {
      control: 'text',
      description: 'Main body text of the banner',
    },
    actionText: {
      control: 'text',
      description: 'Call-to-action link text',
    },
    actionHref: {
      control: 'text',
      description: 'Call-to-action link destination URL',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether to display a close/dismiss button',
    },
    centered: {
      control: 'boolean',
      description: 'Whether content is centered horizontally',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the banner is sticky/fixed to viewport',
    },
    role: {
      control: 'text',
      description: 'ARIA role for accessibility (region, banner, status, alert)',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible description label for the banner',
    },
  },
  args: {
    position: 'top',
    variant: 'default',
    title: '',
    content: 'Upgrading your account to be used with UAE Pass is now active.',
    actionText: 'Connect your account to UAE PASS',
    actionHref: '#',
    dismissible: false,
    centered: true,
    sticky: false,
    role: 'region',
    ariaLabel: '',
  },
};

export default meta;
type Story = StoryObj<BannerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      title: args.title || undefined,
      actionText: args.actionText || undefined,
      actionHref: args.actionHref || undefined,
      ariaLabel: args.ariaLabel || undefined,
    },
    template: `
      <ae-banner
        [position]="position"
        [variant]="variant"
        [title]="title"
        [content]="content"
        [actionText]="actionText"
        [actionHref]="actionHref"
        [dismissible]="dismissible"
        [centered]="centered"
        [sticky]="sticky"
        [role]="role"
        [ariaLabel]="ariaLabel"
      ></ae-banner>
    `,
  }),
};

export const DarkCamel: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-banner
        position="top"
        variant="camel"
        content="Upgrading your account to be used with UAE Pass is now active."
        actionText="Connect your account to UAE PASS"
        ariaLabel="UAE Pass account connection"
      ></ae-banner>
    `,
  }),
};

export const HeaderIntegratedRed: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-banner
        position="top"
        variant="red"
        content="Discover essential government services and stay informed about policies and initiatives. Your gateway to efficient governance."
        actionText="Learn more"
        role="banner"
        ariaLabel="Government services announcement"
      ></ae-banner>
    `,
  }),
};

export const NoticeSecondaryLight: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-banner
        position="bottom"
        variant="notice-secondary"
        title="We use cookies to personalise this website"
        content="Our site enables script (e.g. cookies) that is able to read, store, and write information on your browser and in your device. By using our website, you're agreeing to the collection of data as described in our Privacy Policy."
        ariaLabel="Cookie consent banner"
      >
        <div banner-actions class="flex items-center gap-3">
          <a href="#" class="aegov-btn btn-secondary">Accept</a>
          <a href="#" class="aegov-btn btn-secondary btn-link">Deny</a>
        </div>
      </ae-banner>
    `,
  }),
};

export const NoticePrimaryLight: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-banner
        position="bottom"
        variant="notice-primary"
        title="We use cookies to personalise this website"
        content="Our site enables script (e.g. cookies) that is able to read, store, and write information on your browser and in your device. By using our website, you're agreeing to the collection of data as described in our Privacy Policy."
        ariaLabel="Cookie consent banner"
      >
        <div banner-actions class="flex items-center gap-3">
          <a href="#" class="aegov-btn btn-primary">Accept</a>
          <a href="#" class="aegov-btn btn-primary btn-link">Deny</a>
        </div>
      </ae-banner>
    `,
  }),
};

export const DarkDismissible: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6">
        <ae-banner
          variant="dark"
          position="static"
          content="We are participating at World Government Summit 2023"
          actionText="Come join us"
          [dismissible]="true"
          role="status"
        ></ae-banner>
      </div>
    `,
  }),
};

export const DismissibleTopBanner: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-banner
        position="top"
        variant="default"
        content="System scheduled maintenance on Saturday between 02:00 AM and 04:00 AM GST."
        actionText="View schedule"
        [dismissible]="true"
      ></ae-banner>
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
        <div dir="ltr" class="border border-gray-200 rounded-lg p-2">
          <div class="text-xs font-bold text-gray-500 uppercase px-4 py-2">LTR Orientation</div>
          <ae-banner
            position="static"
            variant="camel"
            content="Upgrading your account to be used with UAE Pass is now active."
            actionText="Connect your account to UAE PASS"
            [dismissible]="true"
          ></ae-banner>
        </div>

        <div dir="rtl" class="border border-primary-200 bg-primary-50/10 rounded-lg p-2">
          <div class="text-xs font-bold text-primary-700 uppercase px-4 py-2">تخطيط من اليمين إلى اليسار (RTL)</div>
          <ae-banner
            position="static"
            variant="camel"
            content="لقد أصبحت ترقية حسابك لاستخدامه مع UAE Pass نشطة الآن."
            actionText="قم بربط حسابك بـ UAE PASS"
            [dismissible]="true"
          ></ae-banner>
        </div>
      </div>
    `,
  }),
};
