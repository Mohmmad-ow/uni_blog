import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import { AuthContextProvider } from './context/authContext.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

axios.defaults.baseURL = `http://localhost:3000`

// Routes
import Register from './User/Register.jsx'
import Login from './User/Login.jsx'
import Home from './pages/home.jsx'

import './index.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
