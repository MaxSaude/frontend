
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Dashboard from './components/Dashboard/index.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ChakraProvider>

  </React.StrictMode>
)
