import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions'; // Mantener functions para el endpoint

export default defineConfig({
  output: 'server', // Cambiar de 'static' a 'server' para SSR
  adapter: netlify(),
  site: 'https://mrogym.netlify.app/',
  base: '/',
  
  vite: {
    define: {
      'process.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
    },
    build: {
      target: 'esnext',
    },
    ssr: {
      noExternal: true,
    },
  },
});