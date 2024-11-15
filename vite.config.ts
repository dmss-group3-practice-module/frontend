import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const envPrefix = process.env.NODE_ENV;

  return defineConfig({
    base: './',
    envDir: `./env/${envPrefix}`,
    assetsInclude: ['**/*.svg', '**/*.webp'],
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
          dev: { logLevel: ['error'] },
        },
        overlay: {
          position: 'tl',
          initialIsOpen: false,
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1'),
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
        {
          find: /^assets(.+)/,
          replacement: path.join(process.cwd(), 'assets/$1'),
        },
      ],
    },
    server: { port: Number(process.env.VITE_PORT), host: process.env.VITE_HOST },
    preview: { port: Number(process.env.VITE_PORT), host: true },
  });
};
