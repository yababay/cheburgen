import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/pages/funny/_index.js',
  output: {
    file: 'src/pages/funny/bundle.js',
    format: 'iife'
  },
  plugins: [
    css({ output: 'bundle.css' }),
    svelte({

      include: 'src/pages/funny/*.svelte',

      onwarn: (warning, handler) => {
        if (warning.code === 'a11y-distracting-elements') return;
        handler(warning);
      },

      compilerOptions: {
        generate: 'dom',
      }
    }),

    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte']
    }),
  ]
}
