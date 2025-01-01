import { ColorName } from '@src/utils/types-public';
import { CustomThemeConfig } from 'tailwindcss/types/config';

type AliasColorsArguments = Record<string, ColorName>;

function aliasColors(
  aliasColorsArguments: AliasColorsArguments,
): Partial<CustomThemeConfig> {
  const config: Partial<CustomThemeConfig> = {};

  for (const [alias, colorName] of Object.entries(aliasColorsArguments)) {
    config[alias] = {
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
