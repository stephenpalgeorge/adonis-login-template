/**
 * ----------
 * JAVASCRIPT ASSETS
 * ----------
 * 
 * This config will compile every module in the `src/js` directory and put the output
 * code in `public/js/modules/${moduleName}`. It is expected that every directory in 
 * `src/js` will have an `index.js` file at its root.
 * 
 * @example
 * `src/js/base/index.js` -> `public/js/modules/base.js`.
 * These can then be included in the required template files `assets` section.
 */

import fs from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';

const output = [];

let modules = fs.readdirSync(path.resolve(__dirname, 'src', 'js')).filter(mod => {
  return fs.lstatSync(path.resolve(__dirname, 'src', 'js', mod)).isDirectory();
});

function config(moduleName, format = 'cjs') {
  return {
    input: `src/js/${moduleName}/index.js`,
    output: {
      file: `public/js/modules/${moduleName}.js`,
      format,
    },
    plugins: [babel({ babelHelpers: 'bundled' })],
  }
}

modules.forEach(mod => {
  output.push(config(mod));
});

export default output;
