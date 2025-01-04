import path from 'node:path';
import { defineBuildConfig } from '../../builder.ts';

export default defineBuildConfig((palette) => ({
  dir: 'css',
  outputs: [
    {
      templatePath: path.join(
        import.meta.dirname,
        'templates/index.css.template',
      ),
      file: 'index.css',
    },
    ...palette.map((color) => ({
      templatePath: path.join(
        import.meta.dirname,
        'templates/[color].css.template',
      ),
      templateVars: { ...color },
      file: `${color.colorKey}.css`,
    })),
  ],
}));
