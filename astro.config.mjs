import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions'; // Cambiar a Netlify adapter

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://mrogym.netlify.app/', // AÑADE ESTO
  base: '/',                          // AÑADE ESTO
  
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