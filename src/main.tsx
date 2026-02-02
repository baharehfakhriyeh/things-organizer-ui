import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/security/AuthProvider.tsx'
import ParentContainerProvider from './components/container/context/ParentContainerProvider.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ParentContainerProvider>
        <App />
      </ParentContainerProvider>
    </AuthProvider>
  </StrictMode>,
)
