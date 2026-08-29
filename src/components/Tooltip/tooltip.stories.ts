import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { ButtonComponent } from '../Button/button.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, TooltipComponent, TooltipDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    side: 'top',
    content: 'This is a tooltip',
    isOpen: false,
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    content: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Basic: Story = {
  args: {
    content: 'This is a basic tooltip',
    side: 'top',
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <ae-tooltip [content]="content" [side]="side" [isOpen]="isOpen">
          <ae-button variant="solid">Hover me</ae-button>
        </ae-tooltip>
      </div>
    `,
  }),
};

export const Placement: Story = {
  argTypes: {
    side: { table: { disable: true } },
  },
  args: {
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex flex-wrap gap-4 justify-center items-center">
        <ae-tooltip content="Tooltip on top" side="top" [isOpen]="isOpen">
          <ae-button variant="solid">Top</ae-button>
        </ae-tooltip>
        <ae-tooltip content="Tooltip on right" side="right" [isOpen]="isOpen">
          <ae-button variant="solid">Right</ae-button>
        </ae-tooltip>
        <ae-tooltip content="Tooltip on bottom" side="bottom" [isOpen]="isOpen">
          <ae-button variant="solid">Bottom</ae-button>
        </ae-tooltip>
        <ae-tooltip content="Tooltip on left" side="left" [isOpen]="isOpen">
          <ae-button variant="solid">Left</ae-button>
        </ae-tooltip>
      </div>
    `,
  }),
};
