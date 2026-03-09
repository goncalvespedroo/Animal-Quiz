import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App' // Importa a lógica que você criou
import './style.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)