import './App.css';
import Home from './Component/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Layout from './Layout/Layout';
import MySector from './Component/MySector';
import Update from './Component/Update';
import PrivetRoute from './route/PrivateRoute';
import { useEffect } from 'react';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
        {
          path: '/my-sector',
          element: <PrivetRoute><MySector></MySector></PrivetRoute>
        },
        {
          path: '/update/:id',
          element: <Update></Update>,
          loader: ({ params }) => fetch(`https://sector-form-server.vercel.app/mySector/update/${params.id}`)
        },
      ]
    },
  ])

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
