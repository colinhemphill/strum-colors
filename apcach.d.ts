declare module 'apcach' {
  export function apcach(oklch: string, c: number, h: number): string;

  export function apcachToCss(oklch: string, format: string): string;

  export function crToBg(css: string, ratio: number): string;
}
