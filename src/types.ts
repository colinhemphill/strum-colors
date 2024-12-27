export type ColorMode = 'light' | 'dark';

export interface Shade {
  shadeName: string;
  oklch: string;
  srgb: string;
}

export type PaletteWithFallback = {
  colorName: string;
  dark: Shade[];
  light: Shade[];
}[];

export interface BuildTarget {
  /** relative dir in addition to outdir, to keep at root outdir set to '.' */
  dir: string;
  /** individual output files */
  outputs: {
    /** absolute path to template */
    templatePath: string;
    /**
     * vars passed to template
     * if not specified will include the whole palette
     * take any value compatible with Mustache.js, including
     * JSON-serializable objects and functions.
     */
    templateVars?: Record<string, unknown>;
    /** filename to write rendered template to */
    file: string;
  }[];
}

export type BuildConfig =
  | BuildTarget
  | ((palette: PaletteWithFallback) => BuildTarget);
