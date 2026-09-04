import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'link', 'outline'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
    },
    block: {
      control: 'boolean',
    },
    isIcon: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    color: 'primary',
    variant: 'solid',
    size: 'base',
    disabled: false,
    block: false,
    isIcon: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ae-button [color]="color" [variant]="variant" [size]="size" [block]="block" [isIcon]="isIcon" [disabled]="disabled">Button</ae-button>`,
  }),
};

export const PrimaryVariants: Story = {
  argTypes: {
    color: { table: { disable: true } },
    variant: { table: { disable: true } },
    isIcon: { table: { disable: true } },
  },
  args: {
    size: 'base',
    disabled: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-button variant="solid" color="primary" [size]="size" [disabled]="disabled" [block]="block">Solid Button</ae-button>
        <ae-button variant="soft" color="primary" [size]="size" [disabled]="disabled" [block]="block">Soft Button</ae-button>
        <ae-button variant="link" color="primary" [size]="size" [disabled]="disabled" [block]="block">Link Button</ae-button>
        <ae-button variant="outline" color="primary" [size]="size" [disabled]="disabled" [block]="block">Outline Button</ae-button>
      </div>
    `,
  }),
};

export const SecondaryVariants: Story = {
  argTypes: {
    color: { table: { disable: true } },
    variant: { table: { disable: true } },
    isIcon: { table: { disable: true } },
  },
  args: {
    size: 'base',
    disabled: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-button variant="solid" color="secondary" [size]="size" [disabled]="disabled" [block]="block">Solid Button</ae-button>
        <ae-button variant="soft" color="secondary" [size]="size" [disabled]="disabled" [block]="block">Soft Button</ae-button>
        <ae-button variant="link" color="secondary" [size]="size" [disabled]="disabled" [block]="block">Link Button</ae-button>
        <ae-button variant="outline" color="secondary" [size]="size" [disabled]="disabled" [block]="block">Outline Button</ae-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
    isIcon: { table: { disable: true } },
  },
  args: {
    color: 'primary',
    variant: 'solid',
    disabled: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-button size="xs" [color]="color" [variant]="variant" [disabled]="disabled" [block]="block">Extra Small</ae-button>
        <ae-button size="sm" [color]="color" [variant]="variant" [disabled]="disabled" [block]="block">Small</ae-button>
        <ae-button size="base" [color]="color" [variant]="variant" [disabled]="disabled" [block]="block">Base</ae-button>
        <ae-button size="lg" [color]="color" [variant]="variant" [disabled]="disabled" [block]="block">Large</ae-button>
      </div>
    `,
  }),
};

export const BlockButton: Story = {
  argTypes: {
    isIcon: { table: { disable: true } },
  },
  args: {
    block: true,
    color: 'primary',
    variant: 'solid',
    size: 'base',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-button [block]="block" [color]="color" [variant]="variant" [size]="size" [disabled]="disabled">Block Button</ae-button>`,
  }),
};

export const DisabledButton: Story = {
  argTypes: {
    disabled: { table: { disable: true } },
    isIcon: { table: { disable: true } },
  },
  args: {
    color: 'primary',
    variant: 'solid',
    size: 'base',
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-button [disabled]="true" [color]="color" [variant]="variant" [size]="size" [block]="block">Disabled Button</ae-button>`,
  }),
};

export const IconWithSizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
    color: { table: { disable: true } },
    block: { table: { disable: true } },
    isIcon: { table: { disable: true } },
  },
  args: {
    variant: 'solid',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-button [isIcon]="true" size="xs" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="sm" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="base" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="lg" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="xs" color="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="sm" color="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="base" color="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="lg" color="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
      </div>
    `,
  }),
};

export const AsLink: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates using `<ae-button href="...">` to render an accessible anchor tag with button styling and interactive controls.',
      },
    },
  },
  argTypes: {
    isIcon: { table: { disable: true } },
  },
  args: {
    color: 'primary',
    variant: 'solid',
    size: 'base',
    disabled: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-button
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        [color]="color"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [block]="block"
      >
        Link as Button
      </ae-button>
    `,
  }),
};
