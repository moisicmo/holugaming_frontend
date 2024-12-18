import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// Cargar las variables de entorno desde .env
const env = loadEnv('', process.cwd());

// Obtener el valor de la variable de entorno para el host y el puerto
const { VITE_HOST, VITE_PORT } = env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 1600
  },
  server: {
    host: VITE_HOST || 'localhost', // Usar el valor de la variable de entorno o 'localhost' por defecto
    port: Number(VITE_PORT) || 3000, // Usar el valor de la variable de entorno o 3000 por defecto
  },
})
