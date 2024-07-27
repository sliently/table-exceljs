import typescript from '@rollup/plugin-typescript';
import eslint from '@rollup/plugin-eslint';
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/es/index.js',
  },
  plugins: [
    typescript(),
    eslint({
      throwOnError: true,
    }),
  ],
};
