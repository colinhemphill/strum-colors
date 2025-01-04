import { ColorCategory, ColorName } from '@src/utils/types-public';

export interface Shade {
  oklchForeground: string;
  oklch: string;
  shadeName: string;
  rgb: string;
  rgbForeground: string;
}

export type Palette = {
  category: ColorCategory;
  colorKey: ColorName;
  colorName: string;
  dark: Shade[];
  light: Shade[];
}[];

export interface BuildOutput {
  file: string;
  templatePath: string;
  templateVars?: Record<string, unknown>;
}

interface BuildTarget {
  dir: string;
  outputs: BuildOutput[];
}

export type BuildConfig = BuildTarget | ((palette: Palette) => BuildTarget);
