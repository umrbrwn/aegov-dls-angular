import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    currentPage: 3,
    totalPages: 17,
    showFirstLast: false,
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show/hide first and last page buttons',
    },
    pageChange: { action: 'page changed' },
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 17,
    showFirstLast: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange(page: number) {
        (this as any).currentPage = page;
      },
    },
    template: `<ae-pagination [currentPage]="currentPage" [totalPages]="totalPages" [showFirstLast]="showFirstLast" (pageChange)="onPageChange($event); pageChange($event)"></ae-pagination>`,
  }),
};

export const WithFirstLast: Story = {
  args: {
    currentPage: 3,
    totalPages: 17,
    showFirstLast: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange(page: number) {
        (this as any).currentPage = page;
      },
    },
    template: `<ae-pagination [currentPage]="currentPage" [totalPages]="totalPages" [showFirstLast]="showFirstLast" (pageChange)="onPageChange($event); pageChange($event)"></ae-pagination>`,
  }),
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    showFirstLast: false,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange(page: number) {
        (this as any).currentPage = page;
      },
    },
    template: `<ae-pagination [currentPage]="currentPage" [totalPages]="totalPages" [showFirstLast]="showFirstLast" (pageChange)="onPageChange($event); pageChange($event)"></ae-pagination>`,
  }),
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    showFirstLast: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange(page: number) {
        (this as any).currentPage = page;
      },
    },
    template: `<ae-pagination [currentPage]="currentPage" [totalPages]="totalPages" [showFirstLast]="showFirstLast" (pageChange)="onPageChange($event); pageChange($event)"></ae-pagination>`,
  }),
};
