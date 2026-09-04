import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { ButtonComponent } from '../Button/button.component';
import { IconComponent } from '../Icon/icon.component';

export type FileUploadVariant = 'default' | 'simple' | 'card' | 'withPreview' | 'dragDrop';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

@Component({
  selector: 'ae-file-upload',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClasses()">
      <!-- Hidden native file input -->
      <input
        #fileInput
        type="file"
        [accept]="acceptString()"
        [multiple]="maxFiles() > 1"
        [disabled]="disabled()"
        class="hidden"
        (change)="onFileChange($event)"
      />

      <!-- Variant 1: Simple Variant -->
      @if (variant() === 'simple') {
        <div class="w-full">
          <div [class]="simpleContainerClasses()">
            <ae-button
              style="primary"
              variant="link"
              [disabled]="disabled()"
              class="px-4 py-2 rounded-none border-r self-stretch flex items-center justify-center"
              (click)="triggerFileInput(fileInput)"
            >
              {{ label() }}
            </ae-button>
            <div class="flex-1 px-4 py-2 text-gray-500 truncate flex items-center leading-normal" [class.opacity-50]="disabled()">
              {{ selectedFiles().length > 0 ? selectedFiles()[0].name : 'No file chosen' }}
            </div>
          </div>
        </div>
      }

      <!-- Variant 2: Card / WithPreview Variant -->
      @else if (variant() === 'card' || variant() === 'withPreview') {
        <div class="flex items-center gap-3">
          <div [class]="previewAvatarClasses()">
            @if (previewUrl()) {
              <img [src]="previewUrl()" alt="Preview" class="h-full w-full object-cover" />
            } @else {
              <ae-icon name="image" [size]="24" class="text-gray-400"></ae-icon>
            }
          </div>
          <ae-button
            style="primary"
            variant="solid"
            [disabled]="disabled()"
            (click)="triggerFileInput(fileInput)"
          >
            {{ label() }}
          </ae-button>
        </div>
      }

      <!-- Variant 3: Drag & Drop Dropzone -->
      @else if (variant() === 'dragDrop') {
        <div
          [class]="dropzoneClasses()"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
          (click)="triggerFileInput(fileInput)"
        >
          <div class="flex flex-col items-center">
            <ae-icon
              name="upload-simple"
              [size]="32"
              [class]="isDragActive() ? 'text-primary-500 mb-2' : 'text-gray-400 mb-2'"
            ></ae-icon>
            <span [class]="isDragActive() ? 'font-semibold text-primary-600' : 'font-semibold text-gray-600'">
              {{ label() }}
            </span>
            <span class="text-gray-500 mt-1 text-sm" [class.opacity-50]="disabled()">
              {{ maxFiles() > 1 ? 'Up to ' + maxFiles() + ' files' : 'Single file' }}
            </span>
            <p class="text-xs text-gray-400 mt-2" [class.opacity-50]="disabled()">
              Accepts {{ acceptedExtensions() }} up to 50MB
            </p>
          </div>
        </div>
      }

      <!-- Variant 4: Default Button -->
      @else {
        <ae-button
          style="primary"
          variant="solid"
          [disabled]="disabled()"
          (click)="triggerFileInput(fileInput)"
        >
          <ae-icon name="upload-simple" [size]="18" class="me-2"></ae-icon>
          {{ label() }}
        </ae-button>
      }

      <!-- Selected files list -->
      @if (selectedFiles().length > 0) {
        <div class="mt-3 flex flex-col gap-1.5">
          @for (file of selectedFiles(); track file.name; let idx = $index) {
            <div class="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md">
              <button
                type="button"
                (click)="removeFile(idx, fileInput)"
                class="p-1 text-red-500 hover:text-red-700 rounded-full cursor-pointer flex items-center justify-center"
                aria-label="Remove file"
              >
                <ae-icon name="x" [size]="14"></ae-icon>
              </button>
              <span class="truncate flex-1 font-medium">{{ file.name }}</span>
              <span class="text-xs text-gray-400">{{ formatFileSize(file.size) }}</span>
            </div>
          }
        </div>
      }

      <!-- Error message -->
      @if (errorMessage()) {
        <p class="text-sm text-red-500 mt-2">
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
export class FileUploadComponent {
  readonly variant = input<FileUploadVariant>('default');
  readonly maxFiles = input<number>(1);
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly label = input<string>('Upload file');
  readonly acceptedFileTypes = input<Record<string, string[]> | string>({
    'image/jpeg': [],
    'image/png': [],
    'image/gif': []
  });
  readonly accept = input<string | undefined>(undefined);
  readonly class = input<string>('');

  readonly filesSelected = output<File[]>();

  readonly selectedFiles = signal<File[]>([]);
  readonly errorMessage = signal<string>('');
  readonly previewUrl = signal<string | null>(null);
  readonly isDragActive = signal<boolean>(false);

  readonly wrapperClasses = computed(() => cn('w-full', this.class()));

  readonly acceptString = computed(() => {
    if (this.accept()) return this.accept()!;
    const types = this.acceptedFileTypes();
    if (typeof types === 'string') return types;
    return Object.keys(types).join(',');
  });

  readonly acceptedExtensions = computed(() => {
    const types = this.acceptedFileTypes();
    if (typeof types === 'string') return types;
    return Object.keys(types)
      .map(t => t.split('/')[1]?.toUpperCase() || t)
      .join(', ');
  });

  readonly simpleContainerClasses = computed(() =>
    cn(
      'flex border rounded-lg overflow-hidden bg-white',
      this.disabled() && 'opacity-50'
    )
  );

  readonly previewAvatarClasses = computed(() =>
    cn(
      'h-12 w-12 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden shrink-0',
      this.disabled() && 'opacity-50'
    )
  );

  readonly dropzoneClasses = computed(() =>
    cn(
      'border-2 border-dashed rounded-lg p-8 text-center transition-colors select-none',
      this.isDragActive() ? 'border-primary-500 bg-primary-50' : 'border-gray-300',
      this.disabled()
        ? 'opacity-50 cursor-not-allowed bg-gray-50'
        : 'cursor-pointer hover:border-primary-500 bg-white'
    )
  );

  triggerFileInput(inputEl: HTMLInputElement): void {
    if (this.disabled()) return;
    inputEl.click();
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFiles(Array.from(target.files));
    }
  }

  onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragActive.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragActive.set(false);
  }

  onDrop(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragActive.set(false);
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  handleFiles(files: File[]): void {
    if (!files.length) return;

    if (this.selectedFiles().length + files.length > this.maxFiles()) {
      this.errorMessage.set(`You can only upload up to ${this.maxFiles()} files`);
      return;
    }

    const oversized = files.find(f => f.size > MAX_FILE_SIZE);
    if (oversized) {
      this.errorMessage.set('Files must be less than 50MB');
      return;
    }

    this.selectedFiles.update(prev => [...prev, ...files]);
    this.errorMessage.set('');
    this.filesSelected.emit(files);

    if ((this.variant() === 'card' || this.variant() === 'withPreview') && files[0]?.type.startsWith('image/')) {
      const url = URL.createObjectURL(files[0]);
      this.previewUrl.set(url);
    }
  }

  removeFile(index: number, inputEl?: HTMLInputElement): void {
    this.selectedFiles.update(prev => prev.filter((_, i) => i !== index));
    if (inputEl) inputEl.value = '';
    if (this.previewUrl()) {
      URL.revokeObjectURL(this.previewUrl()!);
      this.previewUrl.set(null);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
