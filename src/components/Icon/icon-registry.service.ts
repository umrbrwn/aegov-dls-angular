import {
  Injectable,
  makeEnvironmentProviders,
  EnvironmentProviders,
  provideEnvironmentInitializer,
  inject
} from '@angular/core';
import { defaultIcons } from './default-icons';

export type IconWeight = 'regular' | 'bold' | 'fill' | 'light' | 'thin' | 'duotone';

export interface IconDefinition {
  name: string;
  weight?: IconWeight;
  svg: string;
}

@Injectable({
  providedIn: 'root',
})
export class AeIconRegistry {
  // Map key: `${weight}:${name}`
  private registry = new Map<string, string>();

  constructor() {
    // Automatically pre-load internal default icons across weights
    for (const [weight, icons] of Object.entries(defaultIcons)) {
      for (const [name, svg] of Object.entries(icons)) {
        this.registry.set(`${weight}:${name}`, svg);
      }
    }
  }

  /**
   * Register a single icon with optional weight (defaults to 'regular')
   */
  registerIcon(name: string, svg: string, weight: IconWeight = 'regular'): void {
    this.registry.set(`${weight}:${name}`, svg);
  }

  /**
   * Register multiple icons under a specific weight
   */
  registerIcons(icons: Record<string, string>, weight: IconWeight = 'regular'): void {
    for (const [name, svg] of Object.entries(icons)) {
      this.registry.set(`${weight}:${name}`, svg);
    }
  }

  /**
   * Retrieve icon SVG paths/content for a given name and weight
   */
  getIcon(name: string, weight: IconWeight = 'regular'): string | undefined {
    return this.registry.get(`${weight}:${name}`);
  }

  /**
   * Check if an icon is registered
   */
  hasIcon(name: string, weight: IconWeight = 'regular'): boolean {
    return this.registry.has(`${weight}:${name}`);
  }
}

/**
 * Helper to provide and register custom icons at application or component level
 */
export function provideAeIcons(
  icons: Record<string, string>,
  weight: IconWeight = 'regular'
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const registry = inject(AeIconRegistry);
      registry.registerIcons(icons, weight);
    }),
  ]);
}
