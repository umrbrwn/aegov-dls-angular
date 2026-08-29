import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { RadioGroupComponent, RadioItemComponent } from './radio.component';

const meta: Meta<RadioGroupComponent> = {
  title: 'Components/Radio',
  component: RadioGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [RadioGroupComponent, RadioItemComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  subcomponents: { RadioItem: RadioItemComponent as any },
  args: {
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    disabled: false,
    required: false,
    defaultValue: 'option1',
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    defaultValue: {
      control: 'text',
    },
    change: { action: 'radio changed' },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
  args: {
    defaultValue: 'option1',
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-radio-group [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required" [defaultValue]="defaultValue" (change)="change($event)">
        <ae-radio-item value="option1" label="Option 1"></ae-radio-item>
        <ae-radio-item value="option2" label="Option 2"></ae-radio-item>
        <ae-radio-item value="option3" label="Option 3"></ae-radio-item>
      </ae-radio-group>
    `,
  }),
};

export const WithDescription: Story = {
  args: {
    defaultValue: 'starter',
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-radio-group [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required" [defaultValue]="defaultValue" (change)="change($event)">
        <ae-radio-item 
          value="starter" 
          label="Starter plan"
          description="The basic usage plan, starting at $9.99 per month"
        ></ae-radio-item>
        <ae-radio-item 
          value="professional" 
          label="Professional plan"
          description="For teams and organization, starting at $29.99 per month"
        ></ae-radio-item>
        <ae-radio-item 
          value="enterprise" 
          label="Enterprise plan"
          description="For large organisation with SAML support, starting at $99.99 per month"
        ></ae-radio-item>
      </ae-radio-group>
    `,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="mb-4 text-lg font-semibold">Small</h3>
          <ae-radio-group size="sm" defaultValue="small1" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required">
            <ae-radio-item value="small1" label="Small radio button"></ae-radio-item>
            <ae-radio-item value="small2" label="Small radio button" description="With description"></ae-radio-item>
          </ae-radio-group>
        </div>
        <div>
          <h3 class="mb-4 text-lg font-semibold">Base (Default)</h3>
          <ae-radio-group size="base" defaultValue="base1" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required">
            <ae-radio-item value="base1" label="Base radio button"></ae-radio-item>
            <ae-radio-item value="base2" label="Base radio button" description="With description"></ae-radio-item>
          </ae-radio-group>
        </div>
        <div>
          <h3 class="mb-4 text-lg font-semibold">Large</h3>
          <ae-radio-group size="lg" defaultValue="large1" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required">
            <ae-radio-item value="large1" label="Large radio button"></ae-radio-item>
            <ae-radio-item value="large2" label="Large radio button" description="With description"></ae-radio-item>
          </ae-radio-group>
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
  },
  args: {
    size: 'base',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="mb-4 text-lg font-semibold">Primary</h3>
          <ae-radio-group variant="primary" defaultValue="primary1" [size]="size" [orientation]="orientation" [disabled]="disabled" [required]="required">
            <ae-radio-item value="primary1" label="Primary radio"></ae-radio-item>
            <ae-radio-item value="primary2" label="Primary radio" description="With description"></ae-radio-item>
          </ae-radio-group>
        </div>
        <div>
          <h3 class="mb-4 text-lg font-semibold">Secondary</h3>
          <ae-radio-group variant="secondary" defaultValue="secondary1" [size]="size" [orientation]="orientation" [disabled]="disabled" [required]="required">
            <ae-radio-item value="secondary1" label="Secondary radio"></ae-radio-item>
            <ae-radio-item value="secondary2" label="Secondary radio" description="With description"></ae-radio-item>
          </ae-radio-group>
        </div>
      </div>
    `,
  }),
};

export const Orientation: Story = {
  argTypes: {
    orientation: { table: { disable: true } },
  },
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="mb-4 text-lg font-semibold">Vertical (Default)</h3>
          <ae-radio-group orientation="vertical" defaultValue="vertical1" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required">
            <ae-radio-item value="vertical1" label="Option 1"></ae-radio-item>
            <ae-radio-item value="vertical2" label="Option 2"></ae-radio-item>
            <ae-radio-item value="vertical3" label="Option 3"></ae-radio-item>
          </ae-radio-group>
        </div>
        <div>
          <h3 class="mb-4 text-lg font-semibold">Horizontal</h3>
          <ae-radio-group orientation="horizontal" defaultValue="horizontal1" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required">
            <ae-radio-item value="horizontal1" label="Option 1"></ae-radio-item>
            <ae-radio-item value="horizontal2" label="Option 2"></ae-radio-item>
            <ae-radio-item value="horizontal3" label="Option 3"></ae-radio-item>
          </ae-radio-group>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    defaultValue: 'disabled1',
    disabled: true,
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-radio-group [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required" [defaultValue]="defaultValue">
        <ae-radio-item value="disabled1" label="Disabled radio button"></ae-radio-item>
        <ae-radio-item value="disabled2" label="Disabled radio button" description="With description"></ae-radio-item>
      </ae-radio-group>
    `,
  }),
};

export const MixedDisabled: Story = {
  args: {
    defaultValue: 'mixed1',
    disabled: false,
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-radio-group [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required" [defaultValue]="defaultValue" (change)="change($event)">
        <ae-radio-item value="mixed1" label="Enabled radio button"></ae-radio-item>
        <ae-radio-item value="mixed2" label="Disabled radio button" [disabled]="true"></ae-radio-item>
        <ae-radio-item value="mixed3" label="Enabled radio button" description="With description"></ae-radio-item>
      </ae-radio-group>
    `,
  }),
};

export const Required: Story = {
  args: {
    defaultValue: 'required1',
    required: true,
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-radio-group [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required" [defaultValue]="defaultValue">
        <ae-radio-item value="required1" label="Required radio button"></ae-radio-item>
        <ae-radio-item value="required2" label="Required radio button"></ae-radio-item>
      </ae-radio-group>
    `,
  }),
};

export const AsList: Story = {
  args: {
    defaultValue: 'controlled1',
    size: 'base',
    variant: 'primary',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4 max-w-xl">
        <ae-radio-group [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [required]="required" [defaultValue]="defaultValue" (change)="change($event)">
          <ae-radio-item value="controlled1" label="Abdullah Al Mehri" class="border-b border-gray-200 pb-5 px-2"></ae-radio-item>
          <ae-radio-item value="controlled2" label="Maryam Al Kamali" class="border-b border-gray-200 pb-5 px-2"></ae-radio-item>
          <ae-radio-item value="controlled3" label="Shehzad Obaid" class="border-b border-gray-200 pb-5 px-2"></ae-radio-item>
          <ae-radio-item value="controlled4" label="Ramakrishnan Iyer" class="border-b border-gray-200 pb-5 px-2"></ae-radio-item>
        </ae-radio-group>
      </div>
    `,
  }),
};
