import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { AccordionComponent, AccordionItemComponent } from './accordion.component';

const defaultItems = [
  {
    value: '1',
    title: 'What is the meaning of a design system?',
    children: 'A Design System is a comprehensive set of standards, documentation, principles, and components that guide the creation of a digital product\'s user interface (UI). It acts as a single source of truth for designers, developers, and other stakeholders, ensuring consistency across different parts of a product and even across different products within the same brand. The goal is to accelerate the design and development process, improve user experience, and maintain a coherent visual and functional language.',
  },
  {
    value: '2',
    title: 'What are components?',
    children: 'Components are a crucial part of any design system. They are reusable parts of a UI, like buttons, form fields, or navigation menus, and they\'re defined both in terms of their appearance and their behavior.',
  },
  {
    value: '3',
    title: 'What else is part of a design system?',
    children: 'A well-structured design system will also include usage guidelines for each component, detailing when and how it should be used. Besides components, a design system often includes standards for layout, typography, color, iconography, and more. Furthermore, it addresses non-visual factors like accessibility, performance, and localization.',
  },
];

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [AccordionComponent, AccordionItemComponent],
    }),
  ],
  subcomponents: { AccordionItem: AccordionItemComponent as any },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be opened concurrently',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow all items to be closed',
    },
  },
  args: {
    multiple: false,
    collapsible: true,
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

// Default single accordion
export const Default: Story = {
  args: {
    multiple: false,
    collapsible: true,
    defaultValue: '1',
  },
  render: (args) => ({
    props: {
      ...args,
      items: defaultItems,
    },
    template: `
      <ae-accordion
        [items]="items"
        [defaultValue]="defaultValue"
        [multiple]="multiple"
        [collapsible]="collapsible"
      ></ae-accordion>
    `,
  }),
};

// Multiple selection allowed
export const Multiple: Story = {
  args: {
    multiple: true,
    collapsible: true,
    defaultValue: ['1', '2'],
  },
  render: (args) => ({
    props: {
      ...args,
      items: defaultItems,
    },
    template: `
      <ae-accordion
        [items]="items"
        [defaultValue]="defaultValue"
        [multiple]="multiple"
        [collapsible]="collapsible"
      ></ae-accordion>
    `,
  }),
};

// Custom icon
export const CustomIcon: Story = {
  args: {
    multiple: false,
    collapsible: true,
    defaultValue: '1',
  },
  render: (args) => ({
    props: {
      ...args,
      items: defaultItems.map(item => ({
        ...item,
        icon: 'plus',
        iconRotateDeg: 45,
      })),
    },
    template: `
      <ae-accordion
        [items]="items"
        [defaultValue]="defaultValue"
        [multiple]="multiple"
        [collapsible]="collapsible"
      ></ae-accordion>
    `,
  }),
};

// Nested accordions
export const Nested: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ae-accordion
          [items]="[
            {
              value: 'parent-1',
              title: 'Parent Accordion 1',
              children: 'This is the main content of parent accordion 1.'
            },
            {
              value: 'parent-2',
              title: 'Parent Accordion 2',
              children: 'Content of parent accordion 2'
            }
          ]"
          defaultValue="parent-1"
        ></ae-accordion>
      </div>
    `,
  }),
};
