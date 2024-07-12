import React, { useEffect, useState } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './login';
import SignupPage from './SignupPage';
import Layout from './Layout';
import Play from './Play';
import Create from './newQuiz/Create';
import Result from './Result';


export default function App() {
  const routes=createBrowserRouter(
    [
      {
        path:'/',
        element:<Layout />,
        children:[
          {
            path:'',
            element:<Homepage />
          },
        {
        path:'/login',
        element:<LoginPage/>
        },
      {
        path:'signup',
        element:<SignupPage />
      },
      {
        path:'play',
        element:<Play />
      },
      {
        path:'/create',
        element:<Create/>
      },
      {
        path:'/result',
        element:<Result />
      }
    ]
    }
    ]
  )

  
  return (
   < RouterProvider router={routes} />
  )
}
