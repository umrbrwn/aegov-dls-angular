---
description: Generate new aegov design component or directive
---

## Angular Implementation Rules

### Source of Truth
1. Use the Aegov documentation as the primary source of truth.
2. Use all relevant Aegov design system classes documented for the component/directive.
3. If styling or behavior is unclear, inspect `@aegov/design-system/dist/plugin.js`.
4. Do not invent custom CSS classes or artificial styling wrappers.

### Directive vs Component Architecture
* **Directives (`*Directive`):** Use directives for styling native HTML primitive elements (`<button aeButton>`, `<input aeInput>`, `<select aeSelect>`, `<textarea aeTextarea>`, `<a aeHyperlink>`, `<span aeBadge>`, `<blockquote aeBlockquote>`, `<svg aeIcon>`, `[aeTooltip]`). Directives style the native element directly without wrapping shells.
* **Components (`*Component`):** Use components for complex, composite, or multi-element widgets (`<ae-modal>`, `<ae-accordion>`, `<ae-navigation>`, `<ae-dropdown>`, `<ae-checkbox>`, `<ae-radio-group>`, `<ae-tabs>`, `<ae-toast>`).

### Implementation Details
- Implement in Angular (v19+ standalone).
- Generate:
  - `<name>.component.ts` or `<name>.directive.ts` (with inline template if component).
  - `<name>.stories.ts` — demonstrating capabilities.
- Use `src/utils/cn.ts` whenever classes are computed.
- Support custom styling via `readonly className = input<string>('', { alias: 'class' });`.
- Prefer the simplest, most idiomatic developer-facing API.

### Icons
- Use the icon directive: `<svg aeIcon name="..." [size]="..."></svg>`.
- For stories, provide demo icons via `provideAeIcons({...})` in the Storybook decorator (`applicationConfig`).

### Storybook Rules
- Set `component: TargetDirective` (or `TargetComponent`) in Storybook `meta`.
- Only expose `args` and `argTypes` that correspond to actual `@Input()` properties of the directive/component. Do not create artificial story arguments for native HTML attributes or child templates.
- Ensure all controls in the Storybook UI are strictly functional.

### Decision Rule
When requirements conflict, prioritize:
1. Aegov design system specifications
2. `@aegov/design-system/plugin.js`
3. Native HTML directive pattern for primitives
4. Simplest Angular developer API