import type { Meta, StoryObj } from '@storybook/angular';
import { BannerComponent } from './banner.component';
import { ButtonComponent } from '../Button/button.component';

const meta: Meta<BannerComponent> = {
  title: 'Components/Banner',
  component: BannerComponent,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '',
    position: 'top',
    variant: 'default',
    centered: true,
    dismissible: false,
  },
  argTypes: {
    title: {
      control: 'text',
    },
    actionText: {
      control: 'text',
    },
    actionHref: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'static'],
    },
    variant: {
      control: 'select',
      options: ['default', 'camel', 'red', 'dark', 'primaryNotice', 'secondaryNotice'],
    },
    centered: {
      control: 'boolean',
    },
    dismissible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<BannerComponent>;

export const Default: Story = {
  args: {
    position: 'top',
    variant: 'default',
    actionText: 'Connect your account to UAE PASS',
    actionHref: '#',
    dismissible: false,
    centered: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          Upgrading your account to be used with UAE Pass is now active.
        </ae-banner>
      </div>
    `,
  }),
};

export const Camel: Story = {
  args: {
    position: 'top',
    variant: 'camel',
    actionText: 'Connect your account to UAE PASS',
    actionHref: '#',
    dismissible: false,
    centered: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          Upgrading your account to be used with UAE Pass is now active.
        </ae-banner>
      </div>
    `,
  }),
};

export const Red: Story = {
  args: {
    position: 'top',
    variant: 'red',
    actionText: 'Learn more',
    actionHref: '#',
    dismissible: false,
    centered: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          Discover essential government services and stay informed about policies and initiatives. Your gateway to efficient governance.
        </ae-banner>
      </div>
    `,
  }),
};

export const PrimaryNoticeWithActions: Story = {
  args: {
    position: 'bottom',
    variant: 'primaryNotice',
    title: 'We use cookies to personalise this website',
    actionText: 'Accept',
    actionHref: '#',
    dismissible: true,
    centered: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          Our site enables script (e.g. cookies) that is able to read, store, and write information on your browser and in your device. By using our website, you're agreeing to the collection of data as described in our Privacy Policy.
        </ae-banner>
      </div>
    `,
  }),
};

export const NoticeWithActions: Story = {
  args: {
    position: 'bottom',
    variant: 'secondaryNotice',
    title: 'We use cookies to personalise this website',
    actionText: 'Accept',
    actionHref: '#',
    dismissible: true,
    centered: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          Our site enables script (e.g. cookies) that is able to read, store, and write information on your browser and in your device. By using our website, you're agreeing to the collection of data as described in our Privacy Policy.
        </ae-banner>
      </div>
    `,
  }),
};

export const DarkDismissible: Story = {
  args: {
    variant: 'dark',
    position: 'static',
    actionText: 'Come join us',
    actionHref: '#',
    dismissible: true,
    centered: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          We are participating at World Government Summit 2023
        </ae-banner>
      </div>
    `,
  }),
};

export const BottomPosition: Story = {
  args: {
    position: 'bottom',
    variant: 'default',
    actionText: 'Take Action',
    actionHref: '#',
    dismissible: false,
    centered: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [actionText]="actionText"
          [actionHref]="actionHref"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          This is a bottom banner message
        </ae-banner>
      </div>
    `,
  }),
};

export const WithoutAction: Story = {
  args: {
    position: 'top',
    variant: 'default',
    dismissible: false,
    centered: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          This is a banner without any action button
        </ae-banner>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  args: {
    position: 'top',
    variant: 'default',
    dismissible: true,
    centered: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="pt-16 pb-16">
        <ae-banner
          [position]="position"
          [variant]="variant"
          [title]="title"
          [dismissible]="dismissible"
          [centered]="centered"
        >
          This is a dismissible banner
        </ae-banner>
      </div>
    `,
  }),
};
