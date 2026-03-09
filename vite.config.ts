import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react' // Adicione esse import!

export default defineConfig({
  plugins: [
    react(), // E adicione esse plugin aqui!
    tailwindcss(),
  ],
})