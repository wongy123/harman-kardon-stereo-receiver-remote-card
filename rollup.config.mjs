import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/hk37xx-remote-card.js',
  output: {
    file: 'dist/harman-kardon-stereo-receiver-remote-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [nodeResolve(), terser()],
};
