import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Flicker/', // <--- CAMBIA ESTO POR EL NOMBRE DE TU REPO EN GITHUB
})