import {
  Directive,
  input,
  computed,
} from '@angular/core';
import { cn } from '../../utils/cn';

/**
 * Textarea directive that styles native `<textarea>` elements for the UAE Government Design System.
 *
 * @example
 * ```html
 * <div aeFormControl>
 *   <label for="msg">Message</label>
 *   <div class="form-control-input">
 *     <textarea aeTextarea id="msg" rows="4" placeholder="Enter comments..."></textarea>
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: 'textarea[aeTextarea], [aeTextarea]',
  standalone: true,
  host: {
    '[class]': 'textareaClasses()',
  },
})
export class TextareaDirective {
  readonly className = input<string>('', { alias: 'class' });

  protected readonly textareaClasses = computed(() => {
    return cn(
      'w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none focus:shadow-none resize-y',
      this.className()
    );
  });
}
