/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./main.ts", // Certifique-se de que este caminho aponta para o seu arquivo de lógica
  ],
  theme: {
    extend: {},
  },
  // ADICIONE ISSO AQUI:
  safelist: [
    'bg-green-600',
    'bg-red-600',
    'border-green-800',
    'border-red-800',
    'text-white'
  ],
  plugins: [],
}