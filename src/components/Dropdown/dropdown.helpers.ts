import type { ElementRef, Renderer2 } from '@angular/core';

export type DropdownPlacement = 'bottom' | 'top' | 'left' | 'right';
export type DropdownTrigger = 'click' | 'hover';

export interface DropdownCoordinates {
  top: number;
  left: number;
}

/**
 * Focus management helper: cycles focus across interactive items with index wrap-around.
 */
export function cycleFocus(container: HTMLElement, direction: 1 | -1): void {
  const items = Array.from(
    container.querySelectorAll<HTMLElement>(
      '.dropdown-item:not(.pointer-events-none), a:not([disabled]), button:not([disabled])'
    )
  );
  if (!items.length) return;
  const idx = items.indexOf(document.activeElement as HTMLElement);
  items[(idx + direction + items.length) % items.length].focus();
}

/**
 * Resolves a menu target reference into an HTMLElement.
 */
export function resolveMenuElement(
  target: HTMLElement | ElementRef<HTMLElement> | string | undefined
): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'string') return document.getElementById(target);
  if ('nativeElement' in target) return target.nativeElement;
  return target;
}

/**
 * Determines whether a click inside a custom dropdown menu should trigger closing the menu.
 */
export function shouldCloseOnMenuClick(event: MouseEvent): boolean {
  const target = event.target as HTMLElement | null;
  if (!target) return false;
  if (target.closest('input, textarea, select, [data-dropdown-prevent-close]')) {
    return false;
  }
  return !!target.closest('.dropdown-item, a, button');
}

/**
 * Calculates viewport-anchored coordinates for positioning a dropdown menu.
 * Includes automatic collision detection (flipping bottom/top, left/right),
 * smart horizontal/vertical edge alignment based on available screen space and text direction (LTR/RTL),
 * viewport clamping, and offsetParent coordinate system conversion.
 */
export function computeDropdownPosition(
  triggerEl: HTMLElement,
  menuEl: HTMLElement,
  placement: DropdownPlacement,
  offset: number
): DropdownCoordinates {
  const triggerRect = triggerEl.getBoundingClientRect();
  const menuRect = menuEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const isRtl = getComputedStyle(triggerEl).direction === 'rtl';

  let side: DropdownPlacement = placement;
  const menuHeight = menuRect.height || 200;
  const menuWidth = menuRect.width || 208;

  // Auto-collision detection: switch bottom <-> top if constrained in viewport
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  if (side === 'bottom' && spaceBelow < menuHeight + offset && spaceAbove > spaceBelow) {
    side = 'top';
  } else if (side === 'top' && spaceAbove < menuHeight + offset && spaceBelow > spaceAbove) {
    side = 'bottom';
  }

  // Auto-collision detection: switch right <-> left if constrained in viewport
  const spaceRight = viewportWidth - triggerRect.right;
  const spaceLeft = triggerRect.left;
  if (side === 'right' && spaceRight < menuWidth + offset && spaceLeft > spaceRight) {
    side = 'left';
  } else if (side === 'left' && spaceLeft < menuWidth + offset && spaceRight > spaceLeft) {
    side = 'right';
  }

  let targetTop = 0;
  let targetLeft = 0;

  if (side === 'bottom' || side === 'top') {
    targetTop = side === 'bottom' ? triggerRect.bottom + offset : triggerRect.top - menuHeight - offset;

    if (!isRtl) {
      // LTR: if opening towards right overflows viewport, anchor to trigger right edge
      const roomToRight = viewportWidth - triggerRect.left;
      const roomToLeft = triggerRect.right;
      if (roomToRight < menuWidth + 8 && roomToLeft >= menuWidth + 8) {
        targetLeft = triggerRect.right - menuWidth;
      } else {
        targetLeft = triggerRect.left;
      }
    } else {
      // RTL: if opening towards left overflows viewport, anchor to trigger left edge
      const roomToLeft = triggerRect.right;
      const roomToRight = viewportWidth - triggerRect.left;
      if (roomToLeft < menuWidth + 8 && roomToRight >= menuWidth + 8) {
        targetLeft = triggerRect.left;
      } else {
        targetLeft = triggerRect.right - menuWidth;
      }
    }
  } else {
    // side === 'left' || side === 'right'
    targetLeft = side === 'left'
      ? (isRtl ? triggerRect.right + offset : triggerRect.left - menuWidth - offset)
      : (isRtl ? triggerRect.left - menuWidth - offset : triggerRect.right + offset);

    // If opening downwards overflows viewport, anchor to trigger bottom edge
    const roomBelow = viewportHeight - triggerRect.top;
    const roomAbove = triggerRect.bottom;
    if (roomBelow < menuHeight + 8 && roomAbove >= menuHeight + 8) {
      targetTop = triggerRect.bottom - menuHeight;
    } else {
      targetTop = triggerRect.top;
    }
  }

  // Viewport clamping guarantee: never overflow screen edges or cause horizontal scroll
  if (targetLeft + menuWidth > viewportWidth - 8) {
    targetLeft = Math.max(8, viewportWidth - menuWidth - 8);
  }
  if (targetLeft < 8) {
    targetLeft = 8;
  }

  if (targetTop + menuHeight > viewportHeight - 8) {
    targetTop = Math.max(8, viewportHeight - menuHeight - 8);
  }
  if (targetTop < 8) {
    targetTop = 8;
  }

  const isFixed = getComputedStyle(menuEl).position === 'fixed';
  const offsetParent = menuEl.offsetParent as HTMLElement | null;

  let top = targetTop;
  let left = targetLeft;

  if (!isFixed) {
    if (offsetParent) {
      const parentRect = offsetParent.getBoundingClientRect();
      top += offsetParent.scrollTop - parentRect.top;
      left += offsetParent.scrollLeft - parentRect.left;
    } else {
      top += window.scrollY;
      left += window.scrollX;
    }
  }

  return {
    top: Math.round(top),
    left: Math.round(left),
  };
}

/**
 * Positions the menu anchored directly to the trigger using the Angular Renderer2.
 */
export function applyDropdownPosition(
  renderer: Renderer2,
  triggerEl: HTMLElement,
  menuEl: HTMLElement,
  placement: DropdownPlacement,
  offset: number
): void {
  renderer.removeClass(menuEl, 'hidden');
  renderer.setStyle(menuEl, 'display', 'block');
  renderer.setStyle(menuEl, 'position', 'absolute');
  renderer.setStyle(menuEl, 'z-index', '50');

  const { top, left } = computeDropdownPosition(triggerEl, menuEl, placement, offset);
  renderer.setStyle(menuEl, 'top', `${top}px`);
  renderer.setStyle(menuEl, 'left', `${left}px`);
}
