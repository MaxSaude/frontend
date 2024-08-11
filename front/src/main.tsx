
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import React from 'react'

createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>

  </React.StrictMode>
)
