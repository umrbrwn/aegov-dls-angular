import { type Meta, type StoryObj, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { HyperlinkComponent } from './hyperlink.component';

const meta: Meta<HyperlinkComponent> = {
  title: 'Components/Hyperlink',
  component: HyperlinkComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([])
      ]
    })
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Hyperlink',
    href: 'https://example.com',
    variant: 'default',
    showIcon: false,
    icon: 'caret-right',
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
    showIcon: {
      control: 'boolean',
    },
    icon: {
      control: 'text',
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
    showIcon: false,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const CTA: Story = {
  args: {
    label: 'Call to Action Link',
    variant: 'cta',
    showIcon: true,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const Soft: Story = {
  args: {
    label: 'Soft Interaction Link',
    variant: 'soft',
    showIcon: false,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Link',
    variant: 'secondary',
    showIcon: false,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const SecondaryWithIcon: Story = {
  args: {
    label: 'Secondary Link with Icon',
    variant: 'secondary',
    showIcon: true,
    external: false,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const ExternalLink: Story = {
  args: {
    label: 'External Link',
    variant: 'default',
    showIcon: false,
    external: true,
    href: 'https://example.com',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" [external]="external" [href]="href" [label]="label"></ae-hyperlink>`,
  }),
};

export const WithRouterLink: Story = {
  args: {
    label: 'Internal Route Link',
    variant: 'cta',
    showIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" routerLink="/services" [label]="label"></ae-hyperlink>`,
  }),
};

export const WithCustomIcon: Story = {
  args: {
    label: 'View All Applications',
    variant: 'secondary',
    showIcon: true,
    icon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template: `<ae-hyperlink [variant]="variant" [showIcon]="showIcon" [icon]="icon" routerLink="/myapplications" [label]="label"></ae-hyperlink>`,
  }),
};

