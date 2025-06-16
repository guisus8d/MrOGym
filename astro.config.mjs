import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  // Nueva configuración recomendada
  experimental: {
    clientPrerender: true,  // Mejora el manejo de rutas
    redirects: true        // Para mejor compatibilidad con Netlify
  },
  vite: {
    build: {
      target: 'esnext',
      ssr: true,
      // Añadir esta configuración para assets
      assetsInlineLimit: 0 // Evita problemas con imágenes
    },
    ssr: {
      noExternal: true,
      // Especifica paquetes externos si es necesario
      external: ['paquetes-grandes'] // Reemplaza con paquetes problemáticos
    },
    define: {
      'import.meta.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
    },
    // Añadir para mejor manejo de rutas
    server: {
      hmr: false
    }
  }
});