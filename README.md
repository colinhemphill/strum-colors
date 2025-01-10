# Strum Colors: Accessible Tailwind-First Color Palette

![NPM Version](https://img.shields.io/npm/v/%40strum%2Fcolors?style=flat)

This package is in beta. Please let me know what you think!

## Setup

```bash
npm i @strum/colors
```

### Tailwind v4

Simply import the CSS config file to use Strum Colors in your app.

```css
@import 'tailwindcss';
@import '@strum/colors/tailwind.css';
```

See the [Tailwind v4 docs](https://tailwindcss.com/docs/v4-beta) for more about CSS configuration.

### Tailwind v3

```tsx
import strumColors from '@strum/colors/tailwind';

export default {
  theme: {
    colors: strumColors,
  },
};
```

### Vanilla CSS

To create a palette as CSS variables, import the colors you want.

```css
@import '@strum/colors/css/blue.css';

h1 {
  color: var(--blue-9);
}
```

Or import all colors at once.

```css
@import '@evilmartians/harmony/css/index.css';

body {
  background-color: var(--slate-1);
}

h1 {
  color: var(--blue-11);
}
```

### JavaScript/TypeScript

You can also import the `oklch` or `rgb` fallback colors as a JavaScript object.

```tsx
import { oklch, rgb } from '@strum/colors/base';
```

The structure of the object looks like the following:

```ts
interface Colors {
  crimson: {
    category: 'accent' | 'accentBright' | 'neutral';
    colorName: string;
    dark: {
      0: {
        color: string;
        foreground: string;
      };
      // ...contains 0 through 12
    };
    light: {
      0: {
        color: string;
        foreground: string;
      };
      // ...contains 0 through 12
    };
  };
}
```

### Aliasing

If using CSS Tailwind config, you can use one of our pre-defined alias CSS files:

```css
@import '@strum/colors/tailwind.css';
@import '@strum/colors/tailwind/alias-neutral-slate.css';
@import '@strum/colors/tailwind/alias-primary-blue.css';
```

In this example, you apply the name `neutral` to the `slate` palette and `primary` to the `blue` palette.

Aliases available:

- `neutral`
- `primary`
- `secondary`
- `accent`
- `success`
- `warning`
- `danger`
- `error`

## Comparisons

Strum Colors is closely related to both [Radix UI Colors](https://www.radix-ui.com/colors) and [Harmony](https://evilmartians.com/opensource/harmony).

In short, where Harmony is a drop-in replacement for the [Tailwind color palette](https://tailwindcss.com/docs/customizing-colors), Strum is a drop-in replacement for Radix UI Colors.

### Harmony

Strum Colors is built as a fork of Harmony, and shares many philosophies in its creation and packaging. We use OKLCH colors (with RGB fallbacks available) to craft our color scales so that you have a consistent hue across different percieved lightness, and consistent accessible contrasting colors.

### Radix UI Colors

Strum Colors uses the same 12 shade scale system as Radix. This means that each step in the system applies to one or more specific use cases, so you can design pages and components by simply knowing which scale to use for each scenario.

See the [Radix UI Color documentation](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) for more information on the color scale.

Strum Colors also uses the same light and dark mode philosophy as Radix, meaning that the same scale applies in both modes. Light and dark mode are not simply inversions of each other, but hand-crafted scales that offer a consistent look and accessibility across both.

Strum Colors also provides the same color scales as Radix, so any neutral or accent color that is [available in Radix](https://www.radix-ui.com/colors/docs/palette-composition/scales) is available here. However, because our scales are crafted using OKLCH, we can use this system to provide consistent hue at different percieved lightness across each scale. Therefore our colors don't match 1-to-1 with Radix.

Additionally, Strum Colors has higher scale contrast in dark mode, where the darkest color is substantially darker than it is in Radix.
