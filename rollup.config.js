import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'lib/browser/index.js',
  output: {
    dir: 'dist',
    format: 'umd',
  },
  plugins: [nodeResolve()],
};