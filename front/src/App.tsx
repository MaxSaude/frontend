
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login/login';
import { Flex } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />
    //   },
    // ],
  },
  {
    path: "login",
    element: <Login />
  }
]);

function App() {

  return (

    <Flex bgColor={'#2E2F36'} w="100vw" h="100vh">
        <RouterProvider router={router} />

    </Flex>
  )
}

export default App
