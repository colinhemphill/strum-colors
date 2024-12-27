import mustache from 'mustache';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import * as v from 'valibot';
import { BuildConfig, ColorMode, PaletteWithFallback, Shade } from './types.ts';

const SourceSchema = v.record(
  v.pipe(
    v.string(),
    v.toLowerCase(),
    v.regex(
      /\w+\/(dark|light)\/(1[0-2]|0[1-9])/,
      'Key must include color name, shade, and color mode. Example: "Red/Dark/09" or "Gray/Light/12"',
    ),
  ),
  v.object({
    $oklch: v.string(
      'Color must be in Oklch format. Example: "oklch(98.83% 0.005 20)"',
    ),
    $srgb: v.string(
      'Fallback color must be in sRGB format. Example: "#ffffff"',
    ),
  }),
);

export type PaletteSource = v.InferInput<typeof SourceSchema>;

export function defineBuildConfig<C extends BuildConfig>(config: C): C {
  return config;
}

export async function build(
  source: PaletteSource,
  directory: string,
  configs: BuildConfig[],
): Promise<string[] | undefined> {
  try {
    // STEP 1: parse palette from source
    const parsed = v.parse(SourceSchema, source);

    // STEP 2: prepare palette into disgestive array for easier processing during build
    const map = new Map<string, PaletteWithFallback[number]>();
    for (const [key, value] of Object.entries(parsed)) {
      const [colorName, mode, shade] = key.split('/');
      const colorMode = mode as ColorMode;
      const shadeName = Number.parseInt(shade).toString(); // remove leading 0
      let color = map.get(colorName);
      if (!color) {
        color = { colorName, dark: [], light: [] };
        map.set(colorName, color);
      }
      const shadeVariables = {
        shadeName,
        oklch: value.$oklch,
        srgb: value.$srgb,
      } satisfies Shade;
      if (colorMode === 'dark') {
        color.dark.push(shadeVariables);
      } else {
        color.light.push(shadeVariables);
      }
    }
    const palette: PaletteWithFallback = [...map.values()];

    // STEP 3: clean output dir to avoid stale files
    await rm(directory, { recursive: true, force: true });

    // STEP 4: build targets
    const filepaths = await Promise.all(
      configs.flatMap((config) => {
        const target = typeof config === 'function' ? config(palette) : config;
        return target.outputs.map(async (output) => {
          const templateFile = Bun.file(output.templatePath);
          const template = await templateFile.text();
          const variables = output.templateVars ?? { palette };
          const content = mustache.render(template, variables);
          const targetDirectory = path.join(directory, target.dir);
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
