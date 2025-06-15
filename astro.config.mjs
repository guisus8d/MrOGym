// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    define: {
      'import.meta.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
    },
  },
});