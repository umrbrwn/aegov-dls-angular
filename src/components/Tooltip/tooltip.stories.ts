import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { TooltipDirective, type TooltipPlacement } from './tooltip.directive';
import { ButtonDirective } from '../Button/button.directive';
import { HyperlinkDirective } from '../Hyperlink/hyperlink.directive';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<TooltipDirective> = {
  title: 'Components/Tooltip',
  component: TooltipDirective,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TooltipDirective, ButtonDirective, HyperlinkDirective, IconDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    aeTooltip: {
      control: 'text',
      description: 'Text content displayed in the floating tooltip',
    },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'] as TooltipPlacement[],
      description: 'Placement side relative to host element',
    },
  },
  args: {
    aeTooltip: 'Helpful tooltip information',
    tooltipPlacement: 'top',
  },
};

export default meta;
type Story = StoryObj<TooltipDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex items-center justify-center">
        <button
          aeButton
          variant="solid"
          color="primary"
          [aeTooltip]="aeTooltip"
          [tooltipPlacement]="tooltipPlacement"
        >
          Hover or Focus Me
        </button>
      </div>
    `,
  }),
};

export const Placements: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-24 flex items-center justify-center gap-6 flex-wrap">
        <button
          aeButton
          variant="outline"
          aeTooltip="Tooltip on top"
          tooltipPlacement="top"
        >
          Tooltip Top
        </button>

        <button
          aeButton
          variant="outline"
          aeTooltip="Tooltip on right"
          tooltipPlacement="right"
        >
          Tooltip Right
        </button>

        <button
          aeButton
          variant="outline"
          aeTooltip="Tooltip on bottom"
          tooltipPlacement="bottom"
        >
          Tooltip Bottom
        </button>

        <button
          aeButton
          variant="outline"
          aeTooltip="Tooltip on left"
          tooltipPlacement="left"
        >
          Tooltip Left
        </button>
      </div>
    `,
  }),
};

export const OnLinksAndIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-16 flex gap-8 items-center justify-center">
        <button
          aeButton
          [isIcon]="true"
          variant="soft"
          aeTooltip="Search services"
          tooltipPlacement="top"
          aria-label="Search"
        >
          <svg aeIcon name="magnifying-glass" [size]="18"></svg>
        </button>

        <a
          aeHyperlink
          href="#help"
          aeTooltip="Read user guide"
          tooltipPlacement="bottom"
        >
          Documentation
        </a>
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
      <div class="p-16 flex items-center justify-center gap-6" dir="rtl">
        <button
          aeButton
          variant="solid"
          aeTooltip="تلميح الأدوات في الأعلى"
          tooltipPlacement="top"
        >
          تلميح أعلى
        </button>

        <button
          aeButton
          variant="outline"
          aeTooltip="معلومات إضافية للمستخدم"
          tooltipPlacement="bottom"
        >
          تلميح أسفل
        </button>
      </div>
    `,
  }),
};
