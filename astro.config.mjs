import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    build: {
      target: 'esnext', // Fuerza ESM
      ssr: true // Habilita SSR explícitamente
    },
    ssr: {
      noExternal: true // Evita problemas con paquetes externos
    },
    define: {
      'import.meta.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
    },
  }
});