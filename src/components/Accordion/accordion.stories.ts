import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { AccordionComponent, AccordionItemComponent } from './accordion.component';

const defaultItems = [
  {
    value: '1',
    title: 'What is the meaning of a design system?',
    content: 'A Design System is a comprehensive set of standards, documentation, principles, and components that guide the creation of a digital product\'s user interface (UI). It acts as a single source of truth for designers, developers, and other stakeholders, ensuring consistency across different parts of a product and even across different products within the same brand. The goal is to accelerate the design and development process, improve user experience, and maintain a coherent visual and functional language.',
  },
  {
    value: '2',
    title: 'What are components?',
    content: 'Components are a crucial part of any design system. They are reusable parts of a UI, like buttons, form fields, or navigation menus, and they\'re defined both in terms of their appearance and their behavior.',
  },
  {
    value: '3',
    title: 'What else is part of a design system?',
    content: 'A well-structured design system will also include usage guidelines for each component, detailing when and how it should be used. Besides components, a design system often includes standards for layout, typography, color, iconography, and more. Furthermore, it addresses non-visual factors like accessibility, performance, and localization.',
  },
];

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
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
    defaultValue: {
      control: 'text',
      description: 'Default active item value (or array of values if multiple is true)',
    },
    icon: {
      control: 'text',
      description: 'Icon name (e.g. caret-down, plus)',
    },
    iconRotateDeg: {
      control: 'number',
      description: 'Degrees to rotate icon on open',
    },
  },
  args: {
    multiple: false,
    collapsible: true,
    defaultValue: '1',
    icon: 'caret-down',
    iconRotateDeg: 180,
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  args: {
    multiple: false,
    collapsible: true,
    defaultValue: '1',
    icon: 'caret-down',
    iconRotateDeg: 180,
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
        [icon]="icon"
        [iconRotateDeg]="iconRotateDeg"
      ></ae-accordion>
    `,
  }),
};

export const Multiple: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <ae-accordion
        [items]="items"
        [defaultValue]="['1', '2']"
        [multiple]="true"
        [collapsible]="true"
        icon="caret-down"
        [iconRotateDeg]="180"
      ></ae-accordion>
    `,
  }),
};

export const PlusIconVariation: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <ae-accordion
        [items]="items"
        defaultValue="1"
        [multiple]="false"
        [collapsible]="true"
        icon="plus"
        [iconRotateDeg]="45"
      ></ae-accordion>
    `,
  }),
};

export const Declarative: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-accordion
        defaultValue="item-1"
        [multiple]="false"
        [collapsible]="true"
        icon="caret-down"
        [iconRotateDeg]="180"
      >
        <ae-accordion-item value="item-1" title="What is a design system?">
          <p>
            A Design System is a comprehensive set of standards, documentation, principles, and components that guide the creation of a digital product's UI.
          </p>
        </ae-accordion-item>
        <ae-accordion-item value="item-2" title="Why use content projection?">
          <p>
            In Angular, content projection via <code>&lt;ng-content&gt;</code> is the idiomatic way to project rich templates, custom markup, or interactive components into accordion panels.
          </p>
        </ae-accordion-item>
        <ae-accordion-item value="item-3" title="Accessibility & ARIA">
          <p>
            The component manages <code>aria-expanded</code> and <code>aria-controls</code> attributes automatically.
          </p>
        </ae-accordion-item>
      </ae-accordion>
    `,
  }),
};

export const Nested: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ae-accordion
        defaultValue="parent-1"
        [multiple]="false"
        [collapsible]="true"
        icon="caret-down"
        [iconRotateDeg]="180"
      >
        <ae-accordion-item value="parent-1" title="Parent Section 1">
          <p style="margin-bottom: 1rem;">Here is some parent information. Below is a nested accordion:</p>
          <ae-accordion
            defaultValue="nested-1"
            icon="plus"
            [iconRotateDeg]="45"
            [multiple]="false"
            [collapsible]="true"
          >
            <ae-accordion-item value="nested-1" title="Nested Topic A">
              <p>Details for nested topic A.</p>
            </ae-accordion-item>
            <ae-accordion-item value="nested-2" title="Nested Topic B" [borderNone]="true">
              <p>Details for nested topic B.</p>
            </ae-accordion-item>
          </ae-accordion>
        </ae-accordion-item>
        <ae-accordion-item value="parent-2" title="Parent Section 2">
          <p>Details for parent section 2.</p>
        </ae-accordion-item>
      </ae-accordion>
    `,
  }),
};
