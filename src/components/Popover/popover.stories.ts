import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { PopoverComponent } from './popover.component';
import { ButtonDirective } from '../Button/button.directive';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<PopoverComponent> = {
  title: 'Components/Popover',
  component: PopoverComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PopoverComponent, ButtonDirective, IconDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: undefined,
    title: 'Popover title',
    description: 'Engaging and insightful content for an enriching experience.',
    triggerText: 'Default popover',
    triggerVariant: 'solid',
    triggerColor: 'primary',
    trigger: 'click',
    side: 'bottom',
    align: 'center',
    widthClass: 'w-64',
    showCloseButton: false,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    isOpen: false,
    hasCustomTrigger: false,
    disabled: false,
    className: '',
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique HTML ID for popover',
    },
    title: {
      control: 'text',
      description: 'Popover header title text',
    },
    description: {
      control: 'text',
      description: 'Popover body description text',
    },
    triggerText: {
      control: 'text',
      description: 'Text for default trigger button',
    },
    triggerVariant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'link'],
      description: 'Default button variant',
    },
    triggerColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Default button color',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Trigger activation mode',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Placement side',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment along the side',
    },
    widthClass: {
      control: 'text',
      description: 'Width utility class',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show an X close button inside popover',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether clicking outside dismisses the popover',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether Escape key dismisses the popover',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    hasCustomTrigger: {
      control: 'boolean',
      description: 'Whether custom trigger element is projected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<PopoverComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      id: args.id || undefined,
      title: args.title || undefined,
      description: args.description || undefined,
    },
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover
          [id]="id"
          [title]="title"
          [description]="description"
          [triggerText]="triggerText"
          [triggerVariant]="triggerVariant"
          [triggerColor]="triggerColor"
          [trigger]="trigger"
          [side]="side"
          [align]="align"
          [widthClass]="widthClass"
          [showCloseButton]="showCloseButton"
          [closeOnOutsideClick]="closeOnOutsideClick"
          [closeOnEscape]="closeOnEscape"
          [isOpen]="isOpen"
          [hasCustomTrigger]="hasCustomTrigger"
          [disabled]="disabled"
          [className]="className"
        ></ae-popover>
      </div>
    `,
  }),
};

export const FlexiblePopover: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover triggerText="Flexible Popover" widthClass="w-72">
          <div slot="content" class="space-y-3">
            <p class="text-sm text-aeblack-700 leading-relaxed mb-0">
              Add text, images, links, or any content to enhance the user experience and share extra details.
            </p>
            <div class="pt-2 flex justify-end gap-2 border-t border-aeblack-100">
              <a href="#" (click)="$event.preventDefault()" class="text-xs font-semibold text-primary-600 hover:underline">
                Read guidelines
              </a>
            </div>
          </div>
        </ae-popover>
      </div>
    `,
  }),
};

export const TriggerOnHover: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover
          triggerText="Hover me"
          trigger="hover"
          title="Quick Information"
          description="This popover opens seamlessly when the user hovers over the trigger."
          side="top"
        ></ae-popover>
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
      <div class="p-28 flex flex-wrap gap-8 justify-center items-center">
        <ae-popover
          triggerText="Top Popover"
          side="top"
          title="Top Position"
          description="Opens floating directly above the trigger element."
        ></ae-popover>

        <ae-popover
          triggerText="Bottom Popover"
          side="bottom"
          title="Bottom Position"
          description="Opens floating directly below the trigger element."
        ></ae-popover>

        <ae-popover
          triggerText="Left Popover"
          side="left"
          title="Left Position"
          description="Opens floating to the left of the trigger element."
        ></ae-popover>

        <ae-popover
          triggerText="Right Popover"
          side="right"
          title="Right Position"
          description="Opens floating to the right of the trigger element."
        ></ae-popover>
      </div>
    `,
  }),
};

export const InteractiveCardPopover: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover
          widthClass="w-80"
          [hasCustomTrigger]="true"
          [showCloseButton]="true"
        >
          <button trigger type="button" class="aegov-btn btn-secondary flex items-center gap-2">
            <svg aeIcon name="info" [size]="18"></svg>
            <span>Service Requirements</span>
          </button>

          <div slot="content" class="space-y-3 p-1">
            <h4 class="font-bold text-aeblack-900 text-sm">Required Documents</h4>
            <ul class="text-xs text-aeblack-600 space-y-1 list-disc ps-4">
              <li>Original Emirates ID card</li>
              <li>Valid passport with residency visa</li>
              <li>Proof of residential address (DEWA bill)</li>
            </ul>
            <div class="pt-2 flex justify-between items-center border-t border-aeblack-100">
              <span class="text-xs text-aeblack-400">Fee: Free</span>
              <button type="button" class="aegov-btn btn-xs">Apply Now</button>
            </div>
          </div>
        </ae-popover>
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
      <div class="p-20 flex justify-center" dir="rtl">
        <ae-popover
          triggerText="تفاصيل الخدمة"
          title="معلومات هامة"
          description="محتوى مفيد وموثوق لتوفير تجربة مستخدم مثرية وسلسة على كافة المنصات."
          widthClass="w-64"
        ></ae-popover>
      </div>
    `,
  }),
};
