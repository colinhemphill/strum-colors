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

interface BuildTarget {
  dir: string;
  outputs: {
    file: string;
    templatePath: string;
    templateVars?: Record<string, unknown>;
  }[];
}

export type BuildConfig = BuildTarget | ((palette: Palette) => BuildTarget);
