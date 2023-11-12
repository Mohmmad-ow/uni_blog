/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { AuthContextProvider } from './context/authContext.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

axios.defaults.baseURL = `http://localhost:3000`

// Routes
import Register from './auth/Register.jsx'
import Login from './auth/Login.jsx'
import Home from './pages/home.jsx'


// Blog Routes
import CreateBlog from './pages/createBlog.jsx'
import ViewBlogs from './pages/blog/viewBlogs.jsx'
import Blog from './pages/blog/viewBlog.jsx'
import UpdateBlog from './pages/blog/updateBlog.jsx'







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
  {
    path: "/blog/create",
    element: <CreateBlog />
  },
  {
    path: "/blogs/all",
    element: <ViewBlogs />
  },
  {
    path: "/blogs/:id",
    element: <Blog />
  },
  {
    path:  "/blogs/:id/update",
    element: <UpdateBlog />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
