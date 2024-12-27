import path from 'node:path';
import { build } from './builder.ts';
import source from './colors.json' with { type: 'json' };
import base from './targets/base/base.config.ts';
import css from './targets/css/css.config.ts';
import tailwind from './targets/tailwind/tailwind.config.ts';

const configs = [base, css, tailwind];
const directory = path.resolve(process.cwd(), 'dist');

await build(source, directory, configs);
