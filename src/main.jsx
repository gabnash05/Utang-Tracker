import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { GraphProvider } from './Hooks/GraphProvider.jsx'

createRoot(document.getElementById('root')).render(
  <GraphProvider>
    <StrictMode>
      <App />
    </StrictMode>  
  </GraphProvider>
)
