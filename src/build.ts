import dts from 'bun-plugin-dts';
import path from 'node:path';
import { build } from './builder.ts';
import base from './targets/base/base.config.ts';
import css from './targets/css/css.config.ts';
import tailwind from './targets/tailwind/tailwind.config.ts';

const configs = [base, css, tailwind];
const out = path.resolve(process.cwd(), 'dist');

await build(out, configs);

const entryPublic = path.resolve(process.cwd(), 'src', 'public', 'index.ts');
const outPublic = path.resolve(process.cwd(), 'dist');

await Bun.build({
  entrypoints: [entryPublic],
  format: 'cjs',
  naming: '[dir]/[name].cjs',
  outdir: outPublic,
  plugins: [dts()],
  target: 'browser',
});

await Bun.build({
  entrypoints: [entryPublic],
  format: 'esm',
  naming: '[dir]/[name].js',
  outdir: outPublic,
  plugins: [dts()],
  target: 'browser',
});
