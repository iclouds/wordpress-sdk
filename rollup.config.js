import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['axios', 'qs'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
  ],
}
