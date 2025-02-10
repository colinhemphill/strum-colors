import { ColorName } from '@src/public';

type AliasColorsArguments = Record<string, ColorName>;
type Config = Record<string, Record<number, string>>;

function aliasColors(aliasColorsArguments: AliasColorsArguments): Config {
  const config: Config = {};

  for (const [alias, colorName] of Object.entries(aliasColorsArguments)) {
    config[alias] = {
      0: `var(--color-${colorName}-0)`,
      1: `var(--color-${colorName}-1)`,
      2: `var(--color-${colorName}-2)`,
      3: `var(--color-${colorName}-3)`,
      4: `var(--color-${colorName}-4)`,
      5: `var(--color-${colorName}-5)`,
      6: `var(--color-${colorName}-6)`,
      7: `var(--color-${colorName}-7)`,
      8: `var(--color-${colorName}-8)`,
      9: `var(--color-${colorName}-9)`,
      10: `var(--color-${colorName}-10)`,
      11: `var(--color-${colorName}-11)`,
      12: `var(--color-${colorName}-12)`,
    };
  }

  return config;
}

export { aliasColors };
