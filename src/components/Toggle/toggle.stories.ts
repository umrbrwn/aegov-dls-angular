import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'Components/Toggle',
  component: ToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [ToggleComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'default',
    disabled: false,
    checked: false,
    label: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'mode', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    disabled: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>`,
  }),
};

export const WithLabel: Story = {
  args: {
    label: 'I agree with the terms and conditions',
    variant: 'default',
    disabled: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>`,
  }),
};

export const WithMode: Story = {
  args: {
    variant: 'mode',
    disabled: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>`,
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
    disabled: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: `<ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>`,
  }),
};

export const AllVariants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
  },
  args: {
    disabled: false,
    checked: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <ae-toggle variant="default" [disabled]="disabled" [checked]="checked"></ae-toggle>
          <span class="text-sm text-gray-600">Default</span>
        </div>
        <div class="flex items-center gap-4">
          <ae-toggle variant="success" [disabled]="disabled" [checked]="checked"></ae-toggle>
          <span class="text-sm text-gray-600">Success</span>
        </div>
        <div class="flex items-center gap-4">
          <ae-toggle variant="secondary" [disabled]="disabled" [checked]="checked"></ae-toggle>
          <span class="text-sm text-gray-600">Secondary</span>
        </div>
        <div class="flex items-center gap-4">
          <ae-toggle variant="mode" [disabled]="disabled" [checked]="checked"></ae-toggle>
          <span class="text-sm text-gray-600">Mode</span>
        </div>
      </div>
    `,
  }),
};

export const WithCustomIcons: Story = {
  args: {
    variant: 'default',
    disabled: false,
    checked: false,
    label: 'I agree with the terms and conditions',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-toggle [variant]="variant" [disabled]="disabled" [checked]="checked" [label]="label"></ae-toggle>
    `,
  }),
};
