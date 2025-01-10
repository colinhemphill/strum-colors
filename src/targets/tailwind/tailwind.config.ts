import { defineBuildConfig } from '@src/builder';
import { BuildOutput } from '@src/types';
import path from 'node:path';

const aliases = [
  'neutral',
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'danger',
  'error',
];
const aliasTemplatePath = path.join(
  import.meta.dirname,
  'templates/alias-[alias]-[color].css.template',
);

export default defineBuildConfig((palette) => {
  const colorAliases: BuildOutput[] = [];

  for (const color of palette) {
    colorAliases.push(
      ...aliases.map((alias) => ({
        templatePath: aliasTemplatePath,
        templateVars: { ...color, alias },
        file: `alias-${alias}-${color.colorKey}.css`,
      })),
    );
  }

  return {
    dir: 'tailwind',
    outputs: [
      ...['index.css', 'index.d.ts'].map((file) => ({
        templatePath: path.join(
          import.meta.dirname,
          `templates/${file}.template`,
        ),
        file,
      })),
      ...['index.js', 'index.cjs'].map((file) => ({
        templatePath: path.join(
          import.meta.dirname,
          `templates/${file}.template`,
        ),
        templateVars: {
          palette,
        },
        file,
      })),
      ...colorAliases,
    ],
  };
});
