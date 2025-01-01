import {
  ColorCategory,
  ColorMode,
  ColorName,
} from '@src/utils/types-public.ts';
import { apcach, apcachToCss, crToBg } from 'apcach';
import { Color, formatCss, formatHex, oklch, rgb } from 'culori';
import mustache from 'mustache';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import * as v from 'valibot';
import huesSource from './colors/hues.json' with { type: 'json' };
import shadesSource from './colors/shades.json' with { type: 'json' };
import { BuildConfig, Palette, Shade } from './types.ts';

const ShadeSchema = v.object({
  l: v.number(),
  c: v.number(),
});

const ColorNameSchema = v.pipe(
  v.string(),
  v.regex(
    /(1[0-2]|0[0-9])\/(dark|light)/,
    'Key must be a padded number between 0 and 12 and the color mode, e.g. "04/dark" or "11/light"',
  ),
);

const ShadesSchema = v.object({
  accent: v.record(ColorNameSchema, ShadeSchema),
  accentBright: v.record(ColorNameSchema, ShadeSchema),
  neutral: v.record(ColorNameSchema, ShadeSchema),
});

const HuesSchema = v.array(
  v.object({
    category: v.enum(
      ColorCategory,
      'Category must be "accent", "accentBright", or "neutral"',
    ),
    hue: v.number(),
    name: v.string(),
    saturation: v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(1)), 1),
  }),
);

export type ShadesSource = v.InferInput<typeof ShadesSchema>;

export type HuesSource = v.InferInput<typeof HuesSchema>;

export function defineBuildConfig<C extends BuildConfig>(config: C): C {
  return config;
}

export async function build(
  out: string,
  configs: BuildConfig[],
): Promise<string[] | undefined> {
  try {
    // STEP 1: parse palette from source
    const shades = v.parse(ShadesSchema, shadesSource);
    const hues = v.parse(HuesSchema, huesSource);

    const huesSorted = hues.sort((a, b) => {
      if (a.hue < b.hue) {
        return -1;
      } else if (a.hue > b.hue) {
        return 1;
      }
      return 0;
    });

    const accentShades = shades.accent;
    const accentBrightShades = shades.accentBright;
    const neutralShades = shades.neutral;

    // STEP 2: prepare palette into array for processing
    const map = new Map<string, Palette[number]>();
    for (const color of huesSorted) {
      const colorKey = color.name.toLowerCase() as ColorName;

      let colorDetails = map.get(colorKey);
      if (!colorDetails) {
        colorDetails = {
          category: color.category,
          colorKey,
          colorName: color.name,
          dark: [],
          light: [],
        };
        map.set(colorKey, colorDetails);
      }

      let shades: Record<
        string,
        {
          l: number;
          c: number;
        }
      >;
      switch (color.category) {
        case ColorCategory.Accent: {
          shades = accentShades;
          break;
        }
        case ColorCategory.AccentBright: {
          shades = accentBrightShades;
          break;
        }
        case ColorCategory.Neutral: {
          shades = neutralShades;
          break;
        }
      }

      for (const [key, shade] of Object.entries(shades)) {
        const [paddedShadeName, mode] = key.split('/');
        const colorMode = mode as ColorMode;
        const shadeName = Number.parseInt(paddedShadeName).toString(); // remove leading 0
        const oklchObject = oklch({
          mode: 'oklch',
          l: shade.l,
          c: shade.c * color.saturation,
          h: color.hue,
        });
        const oklchCss = formatCss(oklchObject);
        const foreground = apcach(crToBg(oklchCss, 60), shade.c, color.hue);
        const shadeVariables = {
          oklch: oklchCss,
          oklchForeground: apcachToCss(foreground, 'oklch'),
          shadeName,
          rgb: formatHex(rgb(oklchCss) as Color),
          rgbForeground: apcachToCss(foreground, 'hex'),
        } satisfies Shade;
        if (colorMode === ColorMode.Dark) {
          colorDetails.dark.push(shadeVariables);
        } else {
          colorDetails.light.push(shadeVariables);
        }
      }
    }

    const palette: Palette = [...map.values()];

    // STEP 3: clean output dir to avoid stale files
    await rm(out, { recursive: true, force: true });

    // STEP 4: build targets
    const filepaths = await Promise.all(
      configs.flatMap((config) => {
        const target = typeof config === 'function' ? config(palette) : config;
        return target.outputs.map(async (output) => {
          const templateFile = Bun.file(output.templatePath);
          const template = await templateFile.text();
          const variables = output.templateVars ?? { palette };
          const content = mustache.render(template, variables);
          const targetDirectory = path.join(out, target.dir);
          const targetFile = path.join(targetDirectory, output.file);
          await mkdir(targetDirectory, { recursive: true });
          await Bun.write(targetFile, content);

          return targetFile;
        });
      }),
    );

    return filepaths;
  } catch (rawError) {
    const error = rawError as Error;
    console.error(error.message);
  }
}
