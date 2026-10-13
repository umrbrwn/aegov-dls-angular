import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxComponent, type CheckboxSize, type CheckboxVariant, type CheckboxLayout } from './checkbox.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, FormsModule],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'] as CheckboxSize[],
      description: 'The sizing scale of the checkbox element',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'] as CheckboxVariant[],
      description: 'Color styling for the checkbox check state',
    },
    layout: {
      control: 'select',
      options: ['auto', 'item', 'group', 'list'] as CheckboxLayout[],
      description: 'Display alignment mode of label, description, and input',
    },
    label: {
      control: 'text',
      description: 'Primary text label for the checkbox',
    },
    description: {
      control: 'text',
      description: 'Accompanying helper description text',
    },
    checked: {
      control: 'boolean',
      description: 'Current checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
    },
    required: {
      control: 'boolean',
      description: 'Indicates mandatory field requirement',
    },
    id: {
      control: 'text',
      description: 'Custom element ID',
    },
    name: {
      control: 'text',
      description: 'Form control input name',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    size: 'base',
    variant: 'primary',
    layout: 'auto',
    label: 'I would prefer option 1',
    description: '',
    checked: false,
    disabled: false,
    required: false,
    id: '',
    name: '',
    className: '',
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      id: args.id || undefined,
      name: args.name || undefined,
      description: args.description || undefined,
    },
    template: `
      <div class="p-6">
        <ae-checkbox
          [id]="id"
          [name]="name"
          [size]="size"
          [variant]="variant"
          [layout]="layout"
          [label]="label"
          [description]="description"
          [(checked)]="checked"
          [disabled]="disabled"
          [required]="required"
          [className]="className"
        ></ae-checkbox>
      </div>
    `,
  }),
};

export const InlineRow: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-6 items-center p-6">
        <ae-checkbox label="Option 1"></ae-checkbox>
        <ae-checkbox label="Option 2" [checked]="true"></ae-checkbox>
        <ae-checkbox label="Option 3"></ae-checkbox>
      </div>
    `,
  }),
};

export const InlineWithLink: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-md">
        <ae-checkbox>
          <span>I agree with the <a href="#" class="text-primary-600 underline font-medium hover:text-primary-700">terms and conditions</a></span>
        </ae-checkbox>
      </div>
    `,
  }),
};

export const WithAdditionalDescription: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 p-6 max-w-md">
        <ae-checkbox
          label="Option 1"
          description="A short description explaining the implications of selecting option 1."
        ></ae-checkbox>
        <ae-checkbox
          label="Option 2"
          description="A short description explaining the implications of selecting option 2."
          [checked]="true"
        ></ae-checkbox>
      </div>
    `,
  }),
};

export const AsListElement: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-md divide-y divide-aeblack-100 border border-aeblack-200 rounded-lg">
        <ae-checkbox layout="list" label="Visa - XXXX XXXX XXXX 3456"></ae-checkbox>
        <ae-checkbox layout="list" label="Visa - XXXX XXXX XXXX 1345" [checked]="true"></ae-checkbox>
        <ae-checkbox layout="list" label="Mastercard - XXXX XXXX XXXX 4453"></ae-checkbox>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 p-6 max-w-md">
        <div class="flex flex-col gap-2">
          <span class="text-xs font-semibold text-gray-400 block">Large (.check-lg)</span>
          <ae-checkbox size="lg" label="Option 1 (Large)" description="Additional details for large checkbox."></ae-checkbox>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs font-semibold text-gray-400 block">Base (.check-base / default)</span>
          <ae-checkbox size="base" label="Option 2 (Base)" description="Additional details for base checkbox."></ae-checkbox>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs font-semibold text-gray-400 block">Small (.check-sm)</span>
          <ae-checkbox size="sm" label="Option 3 (Small)" description="Additional details for small checkbox."></ae-checkbox>
        </div>
      </div>
    `,
  }),
};

export const SecondaryColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 p-6 max-w-md">
        <ae-checkbox variant="secondary" label="Secondary Option 1"></ae-checkbox>
        <ae-checkbox variant="secondary" label="Secondary Option 2" [checked]="true"></ae-checkbox>
      </div>
    `,
  }),
};

export const DisabledState: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 p-6 max-w-md">
        <ae-checkbox label="Disabled Unchecked" [disabled]="true"></ae-checkbox>
        <ae-checkbox label="Disabled Checked" [checked]="true" [disabled]="true"></ae-checkbox>
        <ae-checkbox
          label="Disabled with Description"
          description="This option cannot currently be selected."
          [disabled]="true"
        ></ae-checkbox>
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
      <div class="flex flex-col gap-6 p-6 max-w-md" dir="rtl">
        <div class="flex flex-col gap-4">
          <span class="text-xs font-semibold text-gray-400 block">خيارات معيارية</span>
          <ae-checkbox label="الخيار الأول"></ae-checkbox>
          <ae-checkbox label="الخيار الثاني" [checked]="true"></ae-checkbox>
        </div>

        <div class="flex flex-col gap-4">
          <span class="text-xs font-semibold text-gray-400 block">خيارات مع نص توضيحي</span>
          <ae-checkbox
            label="تفعيل الإشعارات عبر الرسائل النصية"
            description="ستصلك رسائل دورية عند صدور أي تحديث جديد بشأن طلبك."
            [checked]="true"
          ></ae-checkbox>
        </div>
      </div>
    `,
  }),
};
