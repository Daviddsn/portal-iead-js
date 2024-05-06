import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/app/globals.css'
import { Home } from './pages/Home/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
