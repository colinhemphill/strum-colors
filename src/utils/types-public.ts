export enum AccentColor {
  Amber = 'amber',
  Blue = 'blue',
  Brown = 'brown',
  Crimson = 'crimson',
  Cyan = 'cyan',
  Grass = 'grass',
  Green = 'green',
  Indigo = 'indigo',
  Iris = 'iris',
  Jade = 'jade',
  Orange = 'orange',
  Pink = 'pink',
  Plum = 'plum',
  Purple = 'purple',
  Red = 'red',
  Ruby = 'ruby',
  Teal = 'teal',
  Tomato = 'tomato',
  Violet = 'violet',
}

export enum AccentBrightColor {
  Lime = 'lime',
  Mint = 'mint',
  Sky = 'sky',
  Yellow = 'yellow',
}

export enum NeutralColor {
  Gray = 'gray',
  Mauve = 'mauve',
  Olive = 'olive',
  Sage = 'sage',
  Sand = 'sand',
  Slate = 'slate',
}

export type ColorName = AccentColor | AccentBrightColor | NeutralColor;

export type ColorCategory = 'accent' | 'accentBright' | 'neutral';

export enum ColorMode {
  Dark = 'dark',
  Light = 'light',
}

export type Shade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
