import type { Meta, StoryObj } from '@storybook/angular';
import { StepsComponent, type StepItem } from './steps.component';

const defaultSteps: StepItem[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' },
];

const fiveSteps: StepItem[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' },
  { label: 'Step 5' },
];

const meta: Meta<StepsComponent> = {
  title: 'Components/Steps',
  component: StepsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    steps: defaultSteps,
    currentStep: 2,
    size: 'base',
    orientation: 'horizontal',
    showLabels: false,
    className: '',
  },
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of step items defining label and optional href',
    },
    currentStep: {
      control: 'number',
      description: 'Zero-based index of the currently active step',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size scale',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Visual orientation',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels below each step badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes forwarded to the nav wrapper',
    },
  },
};

export default meta;
type Story = StoryObj<StepsComponent>;

// ─── Default (4 steps, current = 3rd) ───────────────────────────────────────────
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="steps"
          [currentStep]="currentStep"
          [size]="size"
          [orientation]="orientation"
          [showLabels]="showLabels"
          [className]="className"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── Multi-Step (5 steps, current = 4th) ────────────────────────────────────────
export const MultiStep: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' },
            { label: 'Step 5' }
          ]"
          [currentStep]="3"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── Text Below (showLabels) ────────────────────────────────────────────────────
export const TextBelow: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'Personal Details' },
            { label: 'Documents Upload' },
            { label: 'Review & Pay' }
          ]"
          [currentStep]="1"
          [showLabels]="true"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── Vertical ───────────────────────────────────────────────────────────────────
export const Vertical: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8">
        <ae-steps
          [steps]="[
            { label: 'Personal Information' },
            { label: 'Verification Process' },
            { label: 'Confirmation' }
          ]"
          [currentStep]="1"
          orientation="vertical"
          [showLabels]="true"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── Small Size ─────────────────────────────────────────────────────────────────
export const Small: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="2"
          size="sm"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── Large Size ─────────────────────────────────────────────────────────────────
export const Large: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="2"
          size="lg"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── All Sizes Comparison ───────────────────────────────────────────────────────
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8 space-y-8">
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="2"
          size="sm"
        ></ae-steps>
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="2"
          size="base"
        ></ae-steps>
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="2"
          size="lg"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── All Completed ──────────────────────────────────────────────────────────────
export const AllCompleted: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="4"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── First Step Active ──────────────────────────────────────────────────────────
export const FirstStepActive: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
            { label: 'Step 4' }
          ]"
          [currentStep]="0"
        ></ae-steps>
      </div>
    `,
  }),
};

// ─── RTL Support ────────────────────────────────────────────────────────────────
export const RTL: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div dir="rtl" class="max-w-2xl px-16 py-8">
        <ae-steps
          [steps]="[
            { label: 'الخطوة 1' },
            { label: 'الخطوة 2' },
            { label: 'الخطوة 3' },
            { label: 'الخطوة 4' }
          ]"
          [currentStep]="2"
          [showLabels]="true"
        ></ae-steps>
      </div>
    `,
  }),
};
