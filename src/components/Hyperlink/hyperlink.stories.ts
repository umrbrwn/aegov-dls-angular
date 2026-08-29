import type { Meta, StoryObj } from '@storybook/angular';
import { HyperlinkComponent } from './hyperlink.component';

const meta: Meta<HyperlinkComponent> = {
  title: 'Components/Hyperlink',
  component: HyperlinkComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Hyperlink',
    href: 'https://example.com',
    variant: 'default',
    icon: false,
    external: false,
  },
  argTypes: {
    label: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['default', 'cta', 'soft', 'secondary', 'secondary-soft'],
    },
    icon: {
      control: 'boolean',
    },
    external: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<HyperlinkComponent>;

export const Default: Story = {
  args: {
    label: 'Default Hyperlink',
    variant: 'default',
    icon: false,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const CTA: Story = {
  args: {
    label: 'Call to Action Link',
    variant: 'cta',
    icon: true,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const Soft: Story = {
  args: {
    label: 'Soft Interaction Link',
    variant: 'soft',
    icon: false,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Link',
    variant: 'secondary',
    icon: false,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const SecondaryWithIcon: Story = {
  args: {
    label: 'Secondary Link with Icon',
    variant: 'secondary',
    icon: true,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const ExternalLink: Story = {
  args: {
    label: 'External Link',
    variant: 'default',
    icon: false,
    external: true,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};
