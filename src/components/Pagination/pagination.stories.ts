import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PaginationComponent, IconDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    currentPage: 3,
    totalPages: 17,
    showFirstLast: false,
    previousLabel: 'Previous',
    nextLabel: 'Next',
    firstLabel: 'First',
    lastLabel: 'Last',
    pageLabel: 'Page',
    ofLabel: 'of',
    pageUrlTemplate: undefined,
    className: '',
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'The currently active page index (1-based)',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of available pages',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Whether to display First and Last page navigation buttons',
    },
    previousLabel: {
      control: 'text',
      description: 'Previous button text label',
    },
    nextLabel: {
      control: 'text',
      description: 'Next button text label',
    },
    firstLabel: {
      control: 'text',
      description: 'First button text label',
    },
    lastLabel: {
      control: 'text',
      description: 'Last button text label',
    },
    pageLabel: {
      control: 'text',
      description: 'Mobile page label (e.g. Page)',
    },
    ofLabel: {
      control: 'text',
      description: 'Mobile of label (e.g. of)',
    },
    pageUrlTemplate: {
      control: 'text',
      description: 'URL pattern template for page links (e.g. ?page={page})',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      pageUrlTemplate: args.pageUrlTemplate || undefined,
    },
    template: `
      <div class="p-8 w-full max-w-3xl">
        <ae-pagination
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          [showFirstLast]="showFirstLast"
          [previousLabel]="previousLabel"
          [nextLabel]="nextLabel"
          [firstLabel]="firstLabel"
          [lastLabel]="lastLabel"
          [pageLabel]="pageLabel"
          [ofLabel]="ofLabel"
          [pageUrlTemplate]="pageUrlTemplate"
          [className]="className"
        ></ae-pagination>
      </div>
    `,
  }),
};

export const WithFirstAndLast: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 w-full max-w-3xl">
        <ae-pagination
          [currentPage]="3"
          [totalPages]="17"
          [showFirstLast]="true"
        ></ae-pagination>
      </div>
    `,
  }),
};

export const SmallPageCount: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 w-full max-w-xl">
        <ae-pagination
          [currentPage]="2"
          [totalPages]="5"
          [showFirstLast]="false"
        ></ae-pagination>
      </div>
    `,
  }),
};

export const MiddlePage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 w-full max-w-3xl">
        <ae-pagination
          [currentPage]="10"
          [totalPages]="25"
          [showFirstLast]="true"
        ></ae-pagination>
      </div>
    `,
  }),
};

export const EndPage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 w-full max-w-3xl">
        <ae-pagination
          [currentPage]="20"
          [totalPages]="20"
          [showFirstLast]="true"
        ></ae-pagination>
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
      <div class="p-8 w-full max-w-3xl font-notokufi" dir="rtl" lang="ar">
        <ae-pagination
          [currentPage]="3"
          [totalPages]="17"
          [showFirstLast]="true"
          previousLabel="السابق"
          nextLabel="التالي"
          firstLabel="الأول"
          lastLabel="الأخير"
          pageLabel="صفحة"
          ofLabel="من"
        ></ae-pagination>
      </div>
    `,
  }),
};
