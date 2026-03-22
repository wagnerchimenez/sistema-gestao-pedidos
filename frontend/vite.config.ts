import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em Docker dev, aponta para o serviço backend pela rede interna.
// Localmente, usa localhost. Controle via VITE_PROXY_TARGET no docker-compose.dev.yml.
const backendUrl = process.env.VITE_PROXY_TARGET ?? 'http://localhost:3001'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // host: true permite que o servidor Vite fique acessível fora do container Docker
    host: true,
    proxy: {
      '/pedidos': backendUrl,
      '/dashboard': backendUrl,
      '/relatorios': backendUrl,
      '/saude': backendUrl,
    },
  },
})
