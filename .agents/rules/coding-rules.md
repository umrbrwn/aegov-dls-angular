---
trigger: always_on
---

# AEGOV-DLS-ANGULAR
Its an opensource npm package (angular design library) ported from @aegov/design-system (tailwind v3 -> v4 with flowbite style js support) package; to be used in angular web apps that may have their own style libraries like bootstrap or tailwind.

## STYLES

1. NEVER edit CSS files inside src/styles/:
- To fix styling issues of *.stories.ts
- Unless explicitly advised

2. ALWAYS:
- Preserve tailwind v4 layers so that consumer apps are able to override our component styles using their tailwind utilities or custom CSS predictably


## STORIES
- Never write any code or configuration that ships in dist
- Story specific code, configuration, icons, styles should be isolated to stories
- Issues found in component should be fixed in component instead of monkeypatching in story
- Add icons only used in stories inside story using provideAeIcons() from icon-registry.service.ts
- Never add story specific icons inside components, directives, services, or default-icons.ts or it will end up in dist, which is a violation