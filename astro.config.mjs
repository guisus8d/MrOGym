import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // Habilita SSR
  adapter: node({
    mode: 'standalone', // Modo autónomo para Netlify
  }),

  // Manejo de variables de entorno
  vite: {
    define: {
      // Define variables de entorno para SSR
      'process.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
      'process.env.OTRA_VARIABLE': JSON.stringify(process.env.OTRA_VARIABLE),
    },
    build: {
      target: 'esnext', // Usa ESM
      ssr: true,        // Habilita SSR en Vite
    },
    ssr: {
      noExternal: true, // Evita problemas con paquetes externos
    },
  },
});