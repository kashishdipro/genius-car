import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main';
import CheckOut from '../../pages/CheckOut/CheckOut';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/Login/Login';
import Orders from '../../pages/Orders/Orders';
import SignUp from '../../pages/SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


const router = createBrowserRouter([
    {
      path: '/',
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
          path: '/signup',
          element: <SignUp/>
        },
        {
          path: '/checkout/:id',
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`),
          element: <ProtectedRoute><CheckOut/></ProtectedRoute>
        },
        {
          path: '/orders',
          loader: () => fetch('http://localhost:5000/orders/'),
          element: <ProtectedRoute><Orders/></ProtectedRoute>
        }
      ]
    }
  ])

export default router;