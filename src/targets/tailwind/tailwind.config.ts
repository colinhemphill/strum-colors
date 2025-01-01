import { defineBuildConfig } from '@src/builder';
import path from 'node:path';

export default defineBuildConfig((palette) => ({
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
  ],
}));
