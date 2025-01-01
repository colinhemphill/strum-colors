# Strum Colors: Accessible Tailwind-First Color Palette

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
