import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import flowEntry from 'rollup-plugin-flow-entry';
import flow from 'rollup-plugin-flow';
import url from 'rollup-plugin-url';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    url(),
    flowEntry(),
    flow({ all: true }),
    babel({
      exclude: '/node_modules/'
    }),
    resolve(),
    commonjs()
  ]
};
