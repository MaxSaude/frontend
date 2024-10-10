
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Empresas from './pages/Empresas/Inicio/index.tsx'
import Dashboard from './components/Dashboard/index.tsx'
import Agendamentos from './pages/Agendamentos/index.tsx'

createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ChakraProvider>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <Dashboard/>
        <Agendamentos />
      </div>
    </ChakraProvider>

  </React.StrictMode>
)
