import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  forwardRef,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../utils/cn';
import { IconDirective, type IconName } from '../Icon/icon.directive';

export type FileUploadVariant = 'button' | 'avatar' | 'dropzone' | 'native';
export type FileUploadSize = 'sm' | 'base' | 'lg';
export type FileUploadColor = 'primary' | 'secondary';

@Component({
  selector: 'ae-file-upload',
  standalone: true,
  imports: [CommonModule, IconDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()">
      <!-- Field Label if provided (e.g. Cover photo / Upload a file) -->
      @if (fieldLabel() && variant() !== 'native') {
        <label [attr.for]="computedId()" class="block text-sm font-semibold text-aeblack-900 mb-2">
          {{ fieldLabel() }}
          @if (required()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
      }

      <!-- VARIANT 1: Button-Based File Input (Primary AEGov Style) -->
      @if (variant() === 'button') {
        <label
          [attr.for]="computedId()"
          class="file-input-label aegov-btn"
          [class.btn-sm]="size() === 'sm'"
          [class.btn-lg]="size() === 'lg'"
          [class.btn-secondary]="color() === 'secondary'"
          [class.file-input-disabled]="disabled()"
          [class.pointer-events-none]="disabled()"
          [class.opacity-40]="disabled()"
        >
          <svg aeIcon [name]="icon() || 'upload-simple'" [size]="computedIconSize()" class="file-summary shrink-0 me-2"></svg>
          <span>{{ label() }}</span>
          @if (required() && !fieldLabel()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
        <input
          [id]="computedId()"
          type="file"
          [name]="name() || computedId()"
          [accept]="accept() || ''"
          [multiple]="multiple()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-required]="required() ? 'true' : null"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          (change)="onFileChange($event)"
          (blur)="onTouched()"
        />
      }

      <!-- VARIANT 2: Avatar / Single Image Feedback -->
      @else if (variant() === 'avatar') {
        <div class="flex items-center gap-x-3">
          <div class="h-12 w-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-aeblack-50 border border-aeblack-100">
            @if (previewUrl() || previewImage()) {
              <img [src]="previewUrl() || previewImage()!" alt="Avatar Preview" class="h-full w-full object-cover" />
            } @else {
              <svg aeIcon name="user" [size]="24" class="text-aeblack-400"></svg>
            }
          </div>
          <div>
            <label
              [attr.for]="computedId()"
              class="file-input-label aegov-btn"
              [class.btn-sm]="size() === 'sm'"
              [class.btn-lg]="size() === 'lg'"
              [class.btn-secondary]="color() === 'secondary'"
              [class.file-input-disabled]="disabled()"
              [class.pointer-events-none]="disabled()"
              [class.opacity-40]="disabled()"
            >
              <svg aeIcon [name]="icon() || 'upload-simple'" [size]="computedIconSize()" class="file-summary shrink-0 me-2"></svg>
              <span>{{ label() }}</span>
              @if (required() && !fieldLabel()) {
                <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
              }
            </label>
            <input
              [id]="computedId()"
              type="file"
              [name]="name() || computedId()"
              [accept]="accept() || 'image/*'"
              [disabled]="disabled()"
              [required]="required()"
              [attr.aria-required]="required() ? 'true' : null"
              [attr.aria-disabled]="disabled() ? 'true' : null"
              (change)="onFileChange($event)"
              (blur)="onTouched()"
            />
          </div>
        </div>
      }

      <!-- VARIANT 3: Drag & Drop UI (form-control-dropbox) -->
      @else if (variant() === 'dropzone') {
        <div
          class="form-control-dropbox px-6 py-10 transition-colors"
          [class.border-primary-500]="isDragActive()"
          [class.bg-primary-50]="isDragActive()"
          [class.ring-2]="isDragActive()"
          [class.ring-primary-500]="isDragActive()"
          [class.opacity-50]="disabled()"
          [class.pointer-events-none]="disabled()"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
        >
          <svg aeIcon name="image" [size]="40" class="text-aeblack-400 mx-auto block mb-2"></svg>
          <div class="mt-4 flex text-sm leading-6 text-aeblack-600 justify-center items-center">
            <label [attr.for]="computedId()" class="relative cursor-pointer rounded-md font-semibold text-primary-600 focus-within:outline-hidden hover:text-primary-500">
              <span>{{ label() }}</span>
              @if (required() && !fieldLabel()) {
                <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
              }
              <input
                [id]="computedId()"
                [name]="name() || computedId()"
                type="file"
                class="sr-only"
                [accept]="accept() || ''"
                [multiple]="multiple()"
                [disabled]="disabled()"
                [required]="required()"
                [attr.aria-required]="required() ? 'true' : null"
                (change)="onFileChange($event)"
                (blur)="onTouched()"
              />
            </label>
            <span class="ps-1">{{ dragDropText() }}</span>
          </div>
          <p class="text-xs leading-5 text-aeblack-600 mt-1">{{ helperText() || 'PNG, JPG, GIF up to 10MB' }}</p>
        </div>
      }

      <!-- VARIANT 4: Native Browser UI with AEGov Form Control wrapper -->
      @else if (variant() === 'native') {
        <label [attr.for]="computedId()">
          {{ fieldLabel() || label() }}
          @if (required()) {
            <span class="text-aered-600 ms-0.5" aria-hidden="true">*</span>
          }
        </label>
        <div class="form-control-input">
          <input
            [id]="computedId()"
            type="file"
            [name]="name() || computedId()"
            [accept]="accept() || ''"
            [multiple]="multiple()"
            [disabled]="disabled()"
            [required]="required()"
            [attr.aria-required]="required() ? 'true' : null"
            [attr.aria-disabled]="disabled() ? 'true' : null"
            (change)="onFileChange($event)"
            (blur)="onTouched()"
            class="px-0"
          />
        </div>
      }

      <!-- File Summary List -->
      @if (showSummary() && selectedFiles().length > 0) {
        <div class="file-input-summary mt-4 flex flex-col gap-3 w-full">
          @for (file of selectedFiles(); track file.name; let idx = $index) {
            <div class="file-input-summary-item flex items-center justify-start gap-3 text-aeblack-500 font-medium text-sm">
              <a
                href="#"
                (click)="removeFile(idx, $event)"
                [attr.aria-label]="'remove ' + file.name"
                class="inline-flex items-center text-aered-600 hover:text-aered-700 transition-colors shrink-0"
              >
                <svg aeIcon name="x-circle" [size]="22" class="text-aered-600"></svg>
                <span class="sr-only">remove {{ file.name }}</span>
              </a>
              <span class="truncate">{{ file.name }}</span>
            </div>
          }
        </div>
      }

      <!-- Error message -->
      @if (errorMessage()) {
        <p class="text-sm text-aered-600 mt-2">
          {{ errorMessage() }}
        </p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class FileUploadComponent implements ControlValueAccessor {
  /**
   * HTML ID for pairing input and label (auto-generated if omitted)
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * Native name attribute for file input
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * File upload layout variant: 'button' | 'avatar' | 'dropzone' | 'native'
   */
  readonly variant = input<FileUploadVariant>('button');

  /**
   * Theme color for button label: 'primary' | 'secondary'
   */
  readonly color = input<FileUploadColor>('primary');

  /**
   * Form control sizing scale: 'sm' | 'base' | 'lg'
   */
  readonly size = input<FileUploadSize>('base');

  /**
   * Text label for upload button or action
   */
  readonly label = input<string>('Upload file');

  /**
   * Optional outer field label (e.g. 'Cover photo' or 'Upload a file')
   */
  readonly fieldLabel = input<string | undefined>(undefined);

  /**
   * Accompanying helper or format description text (e.g. 'PNG, JPG, GIF up to 10MB')
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Text displayed beside the drag & drop trigger link
   */
  readonly dragDropText = input<string>('or drag and drop');

  /**
   * Accepted file extensions or MIME types (e.g. '.png, .jpg, .gif' or 'image/*')
   */
  readonly accept = input<string | undefined>(undefined);

  /**
   * Whether multiple files selection is allowed
   */
  readonly multiple = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Maximum allowed files to upload
   */
  readonly maxFiles = input<number>(10);

  /**
   * Maximum file size allowed in megabytes
   */
  readonly maxSizeInMB = input<number>(50);

  /**
   * Whether to display the uploaded file summary list
   */
  readonly showSummary = input<boolean, unknown>(true, { transform: booleanAttribute });

  /**
   * Initial image URL for avatar preview
   */
  readonly previewImage = input<string | undefined>(undefined);

  /**
   * Leading icon name for button
   */
  readonly icon = input<IconName | undefined>(undefined);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Required attribute
   */
  readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional CSS classes
   */
  readonly className = input<string>('');

  /**
   * Event emitted when files are selected or dropped
   */
  readonly fileChange = output<File[]>();

  /**
   * Event emitted when a file is removed from summary
   */
  readonly fileRemove = output<{ file: File; index: number }>();

  /**
   * Event emitted when validation error occurs
   */
  readonly fileError = output<string>();

  /**
   * Initial file names or File objects to prepopulate summary list
   */
  readonly initialFiles = input<Array<string | File>>([]);

  protected readonly selectedFiles = signal<File[]>([]);
  protected readonly previewUrl = signal<string | null>(null);
  protected readonly isDragActive = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');

  private readonly uniqueId = `file-uploader-${Math.random().toString(36).substring(2, 9)}`;

  protected readonly computedId = computed(() => this.id() || this.uniqueId);

  constructor() {
    effect(() => {
      const init = this.initialFiles();
      if (init && init.length > 0) {
        const fileObjs = init.map(item => {
          if (typeof item === 'string') {
            return new File([''], item, { type: 'image/png' });
          }
          return item;
        });
        this.selectedFiles.set(fileObjs);
      }
    });
  }

  protected readonly containerClasses = computed<string>(() => {
    const sz = this.size();
    const v = this.variant();

    return cn(
      'aegov-form-control',
      (v === 'button' || v === 'avatar') && 'aegov-file-input-control',
      sz === 'sm' && 'control-sm',
      sz === 'lg' && 'control-lg',
      this.className()
    );
  });

  protected readonly computedIconSize = computed<number>(() => {
    const sz = this.size();
    if (sz === 'sm') return 18;
    if (sz === 'lg') return 24;
    return 20;
  });

  protected onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFiles(Array.from(target.files));
    }
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragActive.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragActive.set(false);
  }

  protected onDrop(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragActive.set(false);
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(files: File[]): void {
    if (!files || files.length === 0) return;

    if (!this.multiple() && files.length > 1) {
      files = [files[0]];
    }

    if (this.selectedFiles().length + files.length > this.maxFiles()) {
      const err = `You can only upload up to ${this.maxFiles()} files`;
      this.errorMessage.set(err);
      this.fileError.emit(err);
      return;
    }

    const maxBytes = this.maxSizeInMB() * 1024 * 1024;
    const oversized = files.find(f => f.size > maxBytes);
    if (oversized) {
      const err = `Files must be less than ${this.maxSizeInMB()}MB`;
      this.errorMessage.set(err);
      this.fileError.emit(err);
      return;
    }

    const newFiles = this.multiple() ? [...this.selectedFiles(), ...files] : [...files];
    this.selectedFiles.set(newFiles);
    this.errorMessage.set('');

    if (files[0]?.type.startsWith('image/')) {
      const url = URL.createObjectURL(files[0]);
      this.previewUrl.set(url);
    }

    this.onChange(newFiles);
    this.fileChange.emit(newFiles);
  }

  protected removeFile(index: number, event: MouseEvent): void {
    event.preventDefault();
    const removed = this.selectedFiles()[index];
    const updated = this.selectedFiles().filter((_, i) => i !== index);
    this.selectedFiles.set(updated);
    this.onChange(updated);
    this.fileRemove.emit({ file: removed, index });

    if (updated.length === 0 && this.previewUrl()) {
      URL.revokeObjectURL(this.previewUrl()!);
      this.previewUrl.set(null);
    }
  }

  // ControlValueAccessor
  protected onChange: (value: File[]) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: File[] | null): void {
    this.selectedFiles.set(value || []);
  }

  registerOnChange(fn: (value: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal
  }
}
