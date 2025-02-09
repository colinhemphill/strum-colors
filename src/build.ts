import dts from 'bun-plugin-dts';
import path from 'node:path';
import { build } from './builder.ts';
import base from './targets/base/base.config.ts';
import css from './targets/css/css.config.ts';
import tailwind from './targets/tailwind/tailwind.config.ts';

const configs = [base, css, tailwind];
const out = path.resolve(process.cwd(), 'dist');

await build(out, configs);

const utils = path.resolve(process.cwd(), 'src', 'utils', 'index.ts');
const outUtils = path.resolve(process.cwd(), 'dist', 'utils');

await Bun.build({
  entrypoints: [utils],
  format: 'cjs',
  naming: '[dir]/[name].cjs',
  outdir: outUtils,
  plugins: [dts()],
  target: 'browser',
});

await Bun.build({
  entrypoints: [utils],
  format: 'esm',
  naming: '[dir]/[name].js',
  outdir: outUtils,
  plugins: [dts()],
  target: 'browser',
});

// public types

const publicTypes = path.resolve(
  process.cwd(),
  'src',
  'public-types',
  'index.ts',
);
const outPublicTypes = path.resolve(process.cwd(), 'dist');

await Bun.build({
  entrypoints: [publicTypes],
  format: 'esm',
  naming: '[dir]/[name].js',
  outdir: outPublicTypes,
  plugins: [dts()],
  target: 'browser',
});
