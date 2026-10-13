import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { RadioComponent, RadioGroupComponent } from './radio.component';

const meta: Meta<RadioComponent> = {
  title: 'Components/Radio',
  component: RadioComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RadioComponent, RadioGroupComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: undefined,
    name: 'demo-radio',
    value: 'option1',
    label: 'Standard Radio Option',
    description: '',
    size: 'base',
    variant: 'primary',
    layout: 'auto',
    disabled: false,
    required: false,
    checked: false,
    className: '',
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'HTML ID for input and label pairing',
    },
    name: {
      control: 'text',
      description: 'Form control name',
    },
    value: {
      control: 'text',
      description: 'Value attribute for form submission',
    },
    label: {
      control: 'text',
      description: 'Primary label text',
    },
    description: {
      control: 'text',
      description: 'Accompanying helper description text',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Radio sizing scale',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual color variant',
    },
    layout: {
      control: 'select',
      options: ['auto', 'item', 'group', 'list'],
      description: 'Layout style',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio is required',
    },
    checked: {
      control: 'boolean',
      description: 'Initial or controlled checked state',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<RadioComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      id: args.id || undefined,
      description: args.description || undefined,
    },
    template: `
      <div class="p-8 w-96">
        <ae-radio
          [id]="id"
          [name]="name"
          [value]="value"
          [label]="label"
          [description]="description"
          [size]="size"
          [variant]="variant"
          [layout]="layout"
          [disabled]="disabled"
          [required]="required"
          [checked]="checked"
          [className]="className"
        ></ae-radio>
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
      <div class="p-8 w-96">
        <ae-radio-group orientation="vertical" value="plan01">
          <ae-radio
            name="plan"
            value="plan01"
            label="Starter plan"
            description="The basic usage plan, starting at $9.99 per month"
          ></ae-radio>
          <ae-radio
            name="plan"
            value="plan02"
            label="Professional plan"
            description="For teams and organization, starting at $29.99 per month"
          ></ae-radio>
          <ae-radio
            name="plan"
            value="plan03"
            label="Enterprise plan"
            description="For large organisation with SAML support, starting at $99.99 per month"
          ></ae-radio>
        </ae-radio-group>
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
      <div class="p-8 w-96">
        <ae-radio-group layout="list" value="card-1">
          <ae-radio
            name="card"
            value="card-1"
            label="Visa - XXXX XXXX XXXX 3456"
          ></ae-radio>
          <ae-radio
            name="card"
            value="card-2"
            label="Visa - XXXX XXXX XXXX 1345"
          ></ae-radio>
          <ae-radio
            name="card"
            value="card-3"
            label="Mastercard - XXXX XXXX XXXX 4453"
          ></ae-radio>
        </ae-radio-group>
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
      <div class="p-8 space-y-6 w-96">
        <ae-radio-group value="opt_01">
          <ae-radio size="lg" name="size_opt" value="opt_01" label="Option #1 (Large .check-lg)"></ae-radio>
          <ae-radio size="base" name="size_opt" value="opt_02" label="Option #2 (Base .check-base)"></ae-radio>
          <ae-radio size="sm" name="size_opt" value="opt_03" label="Option #3 (Small .check-sm)"></ae-radio>
        </ae-radio-group>
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
      <div class="p-8">
        <ae-radio-group variant="secondary" orientation="horizontal" value="sec_01">
          <ae-radio name="sec_opt" value="sec_01" label="Secondary Option #1"></ae-radio>
          <ae-radio name="sec_opt" value="sec_02" label="Secondary Option #2"></ae-radio>
        </ae-radio-group>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 space-y-4 w-96">
        <ae-radio
          name="dis_opt"
          value="dis_01"
          label="Disabled Unchecked"
          [disabled]="true"
        ></ae-radio>
        <ae-radio
          name="dis_opt"
          value="dis_02"
          label="Disabled Checked"
          [checked]="true"
          [disabled]="true"
        ></ae-radio>
      </div>
    `,
  }),
};

export const DataDrivenOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      demoOptions: [
        { label: 'Option Alpha', value: 'a', description: 'Immediate electronic dispatch' },
        { label: 'Option Beta', value: 'b', description: 'Standard courier delivery (2-3 days)' },
        { label: 'Option Gamma', value: 'c', description: 'Express delivery within 24 hours', disabled: true },
      ],
    },
    template: `
      <div class="p-8 w-96">
        <ae-radio-group
          [options]="demoOptions"
          value="a"
        ></ae-radio-group>
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
      <div class="p-8 w-96 space-y-6" dir="rtl">
        <div>
          <span class="text-xs font-semibold text-aeblack-400 block mb-2">أزرار راديو أفقية</span>
          <ae-radio-group orientation="horizontal" value="opt_1">
            <ae-radio name="ar_options" value="opt_1" label="الخيار الأول"></ae-radio>
            <ae-radio name="ar_options" value="opt_2" label="الخيار الثاني"></ae-radio>
          </ae-radio-group>
        </div>

        <div>
          <span class="text-xs font-semibold text-aeblack-400 block mb-2">خيارات مع وصف توضيحي</span>
          <ae-radio-group orientation="vertical" value="ar_plan_1">
            <ae-radio
              name="ar_plans"
              value="ar_plan_1"
              label="الباقة الأساسية"
              description="مناسبة للاستخدام الفردي والشركات الناشئة"
            ></ae-radio>
            <ae-radio
              name="ar_plans"
              value="ar_plan_2"
              label="الباقة المتقدمة"
              description="للجهات والمؤسسات ذات المعاملات المتعددة"
            ></ae-radio>
          </ae-radio-group>
        </div>
      </div>
    `,
  }),
};
