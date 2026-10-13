import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FileUploadComponent, type FileUploadSize, type FileUploadVariant, type FileUploadColor } from './file-upload.component';
import { IconDirective } from '../Icon/icon.directive';

const meta: Meta<FileUploadComponent> = {
  title: 'Components/FileUpload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FileUploadComponent, IconDirective],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['button', 'avatar', 'dropzone', 'native'] as FileUploadVariant[],
      description: 'Layout variant of the file uploader',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'] as FileUploadColor[],
      description: 'Theme color for button styling',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'] as FileUploadSize[],
      description: 'The sizing scale of the file upload container',
    },
    label: {
      control: 'text',
      description: 'Text label for upload button or action',
    },
    fieldLabel: {
      control: 'text',
      description: 'Optional outer field label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the upload component',
    },
    dragDropText: {
      control: 'text',
      description: 'Text displayed beside the drag & drop trigger link',
    },
    accept: {
      control: 'text',
      description: 'Accepted file extensions or MIME types',
    },
    multiple: {
      control: 'boolean',
      description: 'Allows multiple files selection',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed in multiple mode',
    },
    maxSizeInMB: {
      control: 'number',
      description: 'Maximum individual file size in Megabytes',
    },
    showSummary: {
      control: 'boolean',
      description: 'Whether to display the uploaded file summary list',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user file uploads',
    },
    required: {
      control: 'boolean',
      description: 'Indicates mandatory field requirement',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    variant: 'button',
    color: 'primary',
    size: 'base',
    label: 'Upload file',
    fieldLabel: 'Attach documents',
    helperText: 'SVG, PNG, JPG or PDF up to 10MB',
    dragDropText: 'or drag and drop',
    accept: '.png,.jpg,.jpeg,.svg,.pdf',
    multiple: false,
    maxFiles: 5,
    maxSizeInMB: 10,
    showSummary: true,
    disabled: false,
    required: false,
    className: '',
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      fieldLabel: args.fieldLabel || undefined,
      helperText: args.helperText || undefined,
      accept: args.accept || undefined,
    },
    template: `
      <div class="p-6 max-w-lg">
        <ae-file-upload
          [variant]="variant"
          [color]="color"
          [size]="size"
          [label]="label"
          [fieldLabel]="fieldLabel"
          [helperText]="helperText"
          [dragDropText]="dragDropText"
          [accept]="accept"
          [multiple]="multiple"
          [maxFiles]="maxFiles"
          [maxSizeInMB]="maxSizeInMB"
          [showSummary]="showSummary"
          [disabled]="disabled"
          [required]="required"
          [className]="className"
        ></ae-file-upload>
      </div>
    `,
  }),
};

export const SingleImageFeedback: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-lg">
        <ae-file-upload
          variant="avatar"
          label="Profile Picture / Avatar"
          helperText="Upload a square JPEG/PNG image up to 5MB."
          accept="image/*"
        ></ae-file-upload>
      </div>
    `,
  }),
};

export const WithDragDropUI: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-xl">
        <ae-file-upload
          variant="dropzone"
          label="Supporting Documents"
          [multiple]="true"
          accept=".pdf,.doc,.docx"
          helperText="Upload passport copies, Emirates ID scan, or salary certificates (PDF, DOCX)."
        ></ae-file-upload>
      </div>
    `,
  }),
};

export const SecondaryColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-lg space-y-6">
        <ae-file-upload
          variant="button"
          color="secondary"
          label="Secondary Button Upload"
          helperText="Standard file picker styled with secondary theme."
        ></ae-file-upload>

        <ae-file-upload
          variant="dropzone"
          color="secondary"
          label="Dropzone"
          helperText="Upload documents using secondary styling."
        ></ae-file-upload>
      </div>
    `,
  }),
};

export const DefaultNativeUI: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-lg space-y-4">
        <ae-file-upload variant="native" label="Simple Native Upload"></ae-file-upload>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-lg space-y-6">
        <div>
          <span class="text-xs font-semibold text-gray-400 block mb-2">Large (.control-lg)</span>
          <ae-file-upload size="lg" label="Upload Resume (Large)"></ae-file-upload>
        </div>
        <div>
          <span class="text-xs font-semibold text-gray-400 block mb-2">Base (.control-base / default)</span>
          <ae-file-upload size="base" label="Upload Resume (Base)"></ae-file-upload>
        </div>
        <div>
          <span class="text-xs font-semibold text-gray-400 block mb-2">Small (.control-sm)</span>
          <ae-file-upload size="sm" label="Upload Resume (Small)"></ae-file-upload>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-lg space-y-6">
        <ae-file-upload
          variant="native"
          label="Disabled Native Upload"
          [disabled]="true"
          helperText="This upload input is temporarily disabled."
        ></ae-file-upload>

        <ae-file-upload
          variant="dropzone"
          label="Disabled Dropzone"
          [disabled]="true"
          helperText="File drops are disabled."
        ></ae-file-upload>
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
      <div class="p-6 max-w-xl space-y-6" dir="rtl">
        <ae-file-upload
          variant="dropzone"
          label="تحميل المستندات الرسمية"
          [multiple]="true"
          helperText="قم بتحميل صورة جواز السفر أو بطاقة الهوية الإماراتية (PDF أو صور بحجم أقصاه 10 ميجابايت)."
        ></ae-file-upload>
      </div>
    `,
  }),
};
