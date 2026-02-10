import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>
)
