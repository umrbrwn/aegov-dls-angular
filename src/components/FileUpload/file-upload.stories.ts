import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Components/FileUpload',
  component: FileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [FileUploadComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'default',
    maxFiles: 1,
    disabled: false,
    label: 'Upload file',
    accept: 'image/jpeg,image/png,image/gif',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'simple', 'withPreview', 'dragDrop'],
    },
    maxFiles: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    accept: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    maxFiles: 1,
    disabled: false,
    label: 'Upload file',
    accept: 'image/jpeg,image/png,image/gif',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const Simple: Story = {
  args: {
    variant: 'simple',
    maxFiles: 1,
    disabled: false,
    label: 'Choose file',
    accept: 'image/jpeg,image/png,image/gif',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const WithPreview: Story = {
  args: {
    variant: 'withPreview',
    maxFiles: 1,
    disabled: false,
    label: 'Upload photo',
    accept: 'image/jpeg,image/png,image/gif',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const DragDrop: Story = {
  args: {
    variant: 'dragDrop',
    maxFiles: 3,
    disabled: false,
    label: 'Drag and drop files here',
    accept: 'image/jpeg,image/png,image/gif',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    maxFiles: 1,
    disabled: true,
    label: 'Upload file',
    accept: 'image/jpeg,image/png,image/gif',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const MultipleFiles: Story = {
  args: {
    variant: 'dragDrop',
    maxFiles: 5,
    disabled: false,
    label: 'Drag and drop files here',
    accept: 'image/jpeg,image/png,image/gif',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const DocumentUpload: Story = {
  args: {
    variant: 'simple',
    maxFiles: 1,
    disabled: false,
    label: 'Upload documents',
    accept: '.pdf,.doc,.docx',
  },
  render: (args) => ({
    props: args,
    template: `<ae-file-upload [variant]="variant" [maxFiles]="maxFiles" [accept]="accept" [disabled]="disabled" [label]="label"></ae-file-upload>`,
  }),
};

export const AllVariants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
    maxFiles: { table: { disable: true } },
    disabled: { table: { disable: true } },
    label: { table: { disable: true } },
    accept: { table: { disable: true } },
  },
  render: () => ({
    template: `
      <div class="flex flex-col gap-8 p-8 max-w-2xl">
        <div>
          <h3 class="text-lg font-semibold mb-2">Default Variant</h3>
          <ae-file-upload variant="default"></ae-file-upload>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Simple Variant</h3>
          <ae-file-upload variant="simple"></ae-file-upload>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Preview Variant</h3>
          <ae-file-upload variant="withPreview" accept="image/jpeg,image/png,image/gif"></ae-file-upload>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Drag & Drop Variant</h3>
          <ae-file-upload variant="dragDrop"></ae-file-upload>
        </div>
      </div>
    `,
  }),
};
