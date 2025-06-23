import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions'; // Cambiar a Netlify adapter

export default defineConfig({
  output: 'server',
  adapter: netlify(), // Usar el adaptador de Netlify
  
  vite: {
    define: {
      'process.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
      'process.env.OTRA_VARIABLE': JSON.stringify(process.env.OTRA_VARIABLE),
    },
    build: {
      target: 'esnext',
    },
    ssr: {
      noExternal: true,
    },
  },
});