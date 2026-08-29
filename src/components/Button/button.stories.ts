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
    style: {
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
    style: 'primary',
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
    template: `<ae-button [style]="style" [variant]="variant" [size]="size" [block]="block" [isIcon]="isIcon" [disabled]="disabled">Button</ae-button>`,
  }),
};

export const PrimaryVariants: Story = {
  argTypes: {
    style: { table: { disable: true } },
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
        <ae-button variant="solid" style="primary" [size]="size" [disabled]="disabled" [block]="block">Solid Button</ae-button>
        <ae-button variant="soft" style="primary" [size]="size" [disabled]="disabled" [block]="block">Soft Button</ae-button>
        <ae-button variant="link" style="primary" [size]="size" [disabled]="disabled" [block]="block">Link Button</ae-button>
        <ae-button variant="outline" style="primary" [size]="size" [disabled]="disabled" [block]="block">Outline Button</ae-button>
      </div>
    `,
  }),
};

export const SecondaryVariants: Story = {
  argTypes: {
    style: { table: { disable: true } },
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
        <ae-button variant="solid" style="secondary" [size]="size" [disabled]="disabled" [block]="block">Solid Button</ae-button>
        <ae-button variant="soft" style="secondary" [size]="size" [disabled]="disabled" [block]="block">Soft Button</ae-button>
        <ae-button variant="link" style="secondary" [size]="size" [disabled]="disabled" [block]="block">Link Button</ae-button>
        <ae-button variant="outline" style="secondary" [size]="size" [disabled]="disabled" [block]="block">Outline Button</ae-button>
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
    style: 'primary',
    variant: 'solid',
    disabled: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-button size="xs" [style]="style" [variant]="variant" [disabled]="disabled" [block]="block">Extra Small</ae-button>
        <ae-button size="sm" [style]="style" [variant]="variant" [disabled]="disabled" [block]="block">Small</ae-button>
        <ae-button size="base" [style]="style" [variant]="variant" [disabled]="disabled" [block]="block">Base</ae-button>
        <ae-button size="lg" [style]="style" [variant]="variant" [disabled]="disabled" [block]="block">Large</ae-button>
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
    style: 'primary',
    variant: 'solid',
    size: 'base',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-button [block]="block" [style]="style" [variant]="variant" [size]="size" [disabled]="disabled">Block Button</ae-button>`,
  }),
};

export const DisabledButton: Story = {
  argTypes: {
    disabled: { table: { disable: true } },
    isIcon: { table: { disable: true } },
  },
  args: {
    style: 'primary',
    variant: 'solid',
    size: 'base',
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-button [disabled]="true" [style]="style" [variant]="variant" [size]="size" [block]="block">Disabled Button</ae-button>`,
  }),
};

export const IconWithSizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
    style: { table: { disable: true } },
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
        <ae-button [isIcon]="true" size="xs" style="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="sm" style="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="base" style="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
        <ae-button [isIcon]="true" size="lg" style="secondary" [variant]="variant" [disabled]="disabled">👋</ae-button>
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
    style: 'primary',
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
        [style]="style"
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
