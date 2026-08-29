import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    checked: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-checkbox [label]="label" [description]="description" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>`,
  }),
};

export const WithDescription: Story = {
  args: {
    label: 'Notifications',
    description: 'Get notified when there is a critical issue.',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-checkbox [label]="label" [description]="description" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>`,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-checkbox size="sm" label="Small checkbox" description="This is a small checkbox" [variant]="variant" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>
        <ae-checkbox size="base" label="Base checkbox" description="This is a base checkbox" [variant]="variant" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>
        <ae-checkbox size="lg" label="Large checkbox" description="This is a large checkbox" [variant]="variant" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>
      </div>
    `,
  }),
};

export const Variants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-4">
        <ae-checkbox variant="primary" label="Primary checkbox" description="This uses the primary color scheme" [size]="size" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>
        <ae-checkbox variant="secondary" label="Secondary checkbox" description="This uses the secondary color scheme" [size]="size" [disabled]="disabled" [required]="required" [checked]="checked"></ae-checkbox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    description: 'This checkbox cannot be interacted with',
    disabled: true,
    size: 'base',
    variant: 'primary',
    required: false,
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-checkbox [label]="label" [description]="description" [disabled]="disabled" [size]="size" [variant]="variant" [required]="required" [checked]="checked"></ae-checkbox>`,
  }),
};

export const Required: Story = {
  args: {
    label: 'Required checkbox',
    description: 'This checkbox must be checked',
    required: true,
    disabled: false,
    size: 'base',
    variant: 'primary',
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-checkbox [label]="label" [description]="description" [required]="required" [size]="size" [variant]="variant" [disabled]="disabled" [checked]="checked"></ae-checkbox>`,
  }),
};

export const AllStates: Story = {
  argTypes: {
    disabled: { table: { disable: true } },
    required: { table: { disable: true } },
    checked: { table: { disable: true } },
  },
  args: {
    size: 'base',
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-6">
        <ae-checkbox label="Default checkbox" [size]="size" [variant]="variant"></ae-checkbox>
        <ae-checkbox label="With description" description="Additional information about this checkbox" [size]="size" [variant]="variant"></ae-checkbox>
        <ae-checkbox label="Disabled checkbox" description="This checkbox cannot be interacted with" [disabled]="true" [size]="size" [variant]="variant"></ae-checkbox>
        <ae-checkbox label="Required checkbox" description="This checkbox must be checked" [required]="true" [size]="size" [variant]="variant"></ae-checkbox>
      </div>
    `,
  }),
};

export const AsList: Story = {
  argTypes: {
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
    required: { table: { disable: true } },
    checked: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="bg-white rounded-xl border border-gray-200 p-6 max-w-xl">
        <ul class="divide-y divide-gray-200 w-[400px]">
          <li class="flex items-center justify-between py-4">
            <label class="font-semibold text-gray-800 flex justify-between w-full cursor-pointer">
              Abdullah Al Mehri
              <ae-checkbox [variant]="variant"></ae-checkbox>
            </label>
          </li>
          <li class="flex items-center justify-between py-4">
            <label class="font-semibold text-gray-800 flex justify-between w-full cursor-pointer">
              Maryam Al Kamali
              <ae-checkbox [variant]="variant"></ae-checkbox>
            </label>
          </li>
          <li class="flex items-center justify-between py-4">
            <label class="font-semibold text-gray-800 flex justify-between w-full cursor-pointer">
              Shehzad Obaid
              <ae-checkbox [variant]="variant"></ae-checkbox>
            </label>
          </li>
          <li class="flex items-center justify-between py-4">
            <label class="font-semibold text-gray-800 flex justify-between w-full cursor-pointer">
              Ramakrishnan Iyer
              <ae-checkbox [variant]="variant"></ae-checkbox>
            </label>
          </li>
        </ul>
      </div>
    `,
  }),
};
