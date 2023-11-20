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
import CreateBlog from './pages/blog/createBlog.jsx'
import ViewBlogs from './pages/blog/viewBlogs.jsx'
import Blog from './pages/blog/viewBlog.jsx'
import UpdateBlog from './pages/blog/updateBlog.jsx'
import DeleteBlog from './pages/blog/deleteBlog.jsx'


// Degree Routes
import CreateDegree from './pages/degree/createDegree.jsx'
import ViewDegrees from './pages/degree/viewDegrees.jsx'
import ViewDegree from './pages/degree/viewDegree.jsx'
import DeleteDegree from './pages/degree/deleteDegree.jsx'
import UpdateDegree from './pages/degree/updateDegree.jsx'

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
  },
  {
    path:  "/blogs/:id/delete",
    element: <DeleteBlog />
  },
  {
    path: "/degrees/create",
    element: <CreateDegree />
  },
  {
    path: "/degrees/all",
    element: <ViewDegrees />
  },
  {
    path: "/degree/:id",
    element: <ViewDegree />
  },
  {
    path:  "/degree/:id/update",
    element: <UpdateDegree />
  },
  {
    path:  "/degree/:id/delete",
    element: <DeleteDegree />
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
