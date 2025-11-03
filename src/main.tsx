import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { router } from './route/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </App>
  </StrictMode>,
)
