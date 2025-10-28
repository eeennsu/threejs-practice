import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    alias: [
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/shared/utils') },
      { find: '@shadcn-ui', replacement: path.resolve(__dirname, 'src/shared/shadcn-ui') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/shared/stores') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/shared/hooks') },
      { find: '@typings', replacement: path.resolve(__dirname, 'src/shared/typings') },
      { find: '@consts', replacement: path.resolve(__dirname, 'src/shared/consts') },
      { find: '@contracts', replacement: path.resolve(__dirname, 'src/shared/contracts') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/shared/components') },
      { find: '@configs', replacement: path.resolve(__dirname, 'src/shared/configs') },
      { find: '@icons', replacement: path.resolve(__dirname, 'src/shared/icons') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/shared/styles') },
      { find: '@theme', replacement: path.resolve(__dirname, 'src/shared/styles/theme.ts') },
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
      { find: '@test', replacement: path.resolve(__dirname, 'src/test') },
    ],
  },
});
