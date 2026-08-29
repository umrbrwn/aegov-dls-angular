import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { StepsComponent } from './steps.component';

const defaultSteps = [
  { label: 'Personal Info', href: '#1' },
  { label: 'Account Setup', href: '#2' },
  { label: 'Review', href: '#3' },
  { label: 'Complete', href: '#4' },
];

const arabicSteps = [
  { label: 'المعلومات الشخصية', href: '#1' },
  { label: 'الإعداد المنصوص', href: '#2' },
  { label: 'المراجعة', href: '#3' },
  { label: 'الاكتمال', href: '#4' },
];

const meta: Meta<StepsComponent> = {
  title: 'Components/Steps',
  component: StepsComponent,
  decorators: [
    moduleMetadata({
      imports: [StepsComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'base',
    orientation: 'horizontal',
    currentStep: 1,
    showLabels: false,
    disabled: false,
    steps: defaultSteps,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    currentStep: {
      control: 'number',
    },
    showLabels: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<StepsComponent>;

export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    size: 'base',
    orientation: 'horizontal',
    showLabels: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [size]="size" [orientation]="orientation" [showLabels]="showLabels" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const ProgressWithThreeSteps: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'base',
    orientation: 'horizontal',
    showLabels: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [size]="size" [orientation]="orientation" [showLabels]="showLabels" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const WithLabels: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    showLabels: true,
    size: 'base',
    orientation: 'horizontal',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [showLabels]="showLabels" [size]="size" [orientation]="orientation" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const Small: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'sm',
    orientation: 'horizontal',
    showLabels: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [size]="size" [orientation]="orientation" [showLabels]="showLabels" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const Large: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'lg',
    orientation: 'horizontal',
    showLabels: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [size]="size" [orientation]="orientation" [showLabels]="showLabels" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: 'vertical',
    showLabels: true,
    size: 'base',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [orientation]="orientation" [showLabels]="showLabels" [size]="size" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const VerticalNoLabels: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: 'vertical',
    showLabels: false,
    size: 'base',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [orientation]="orientation" [showLabels]="showLabels" [size]="size" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const Arabic: Story = {
  args: {
    steps: arabicSteps,
    currentStep: 2,
    showLabels: true,
    size: 'base',
    orientation: 'horizontal',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]" dir="rtl"><ae-steps [steps]="steps" [currentStep]="currentStep" [showLabels]="showLabels" [size]="size" [orientation]="orientation" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const Completed: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 4,
    size: 'base',
    orientation: 'horizontal',
    showLabels: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [size]="size" [orientation]="orientation" [showLabels]="showLabels" [disabled]="disabled"></ae-steps></div>`,
  }),
};

export const Disabled: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    disabled: true,
    showLabels: true,
    size: 'base',
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[600px]"><ae-steps [steps]="steps" [currentStep]="currentStep" [disabled]="disabled" [showLabels]="showLabels" [size]="size" [orientation]="orientation"></ae-steps></div>`,
  }),
};
