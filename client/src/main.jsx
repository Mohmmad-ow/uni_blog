/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { AuthContextProvider } from './context/authContext.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

axios.defaults.baseURL = `http://localhost:3000`

// Auth/Home Routes
import Register from './auth/Register.jsx'
import Login from './auth/Login.jsx'
import Home from './pages/home.jsx'
import CreateProfile from './auth/CreateProfile.jsx'
import ViewProfile from './profile/viewProfile.jsx'
import UpdateProfile from './profile/updateProfile.jsx'

// Blog Routes
import CreateBlog from './pages/blog/createBlog.jsx'
import ViewBlogs from './pages/blog/viewBlogs.jsx'
import Blog from './pages/blog/viewBlog.jsx'
import UpdateBlog from './pages/blog/updateBlog.jsx'
import DeleteBlog from './pages/blog/deleteBlog.jsx'
import AddTagsToBlogs from './pages/blog/addTagsToBlogs.jsx'


// Degree Routes
import CreateDegree from './pages/degree/createDegree.jsx'
import ViewDegrees from './pages/degree/viewDegrees.jsx'
import ViewDegree from './pages/degree/viewDegree.jsx'
import DeleteDegree from './pages/degree/deleteDegree.jsx'
import UpdateDegree from './pages/degree/updateDegree.jsx'

// Major Routes
import CreateMajor from './pages/major/createMajor.jsx'
import ViewMajors from './pages/major/viewMajors.jsx'
import ViewMajor from './pages/major/viewMajor.jsx'
import DeleteMajor from './pages/major/deleteMajor.jsx'
import UpdateMajor from './pages/major/updateMajor.jsx'

// Tag Routes
import CreateTags from './pages/tags/createTag.jsx'
import ViewTags from './pages/tags/viewTags.jsx'
import ViewTag from './pages/tags/viewTag.jsx'
import DeleteTag from './pages/tags/deleteTag.jsx'
import UpdateTag from './pages/tags/updateTag.jsx'

// Year Routes
import CreateYears from './pages/year/createYear.jsx'
import ViewYears from './pages/year/viewYears.jsx'
import ViewYear from './pages/year/viewYear.jsx'
import DeleteYear from './pages/year/deleteYear.jsx'
import UpdateYear from './pages/year/updateYear.jsx'

// search bar testing
import SearchForBlogs from './components/searchForBlogs.jsx'

// Settings
import Settings from './utility/settings.jsx'


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
    path: "/profile/create",
    element: <CreateProfile />
  },
  {
    path: "/profile/update",
    element: <UpdateProfile />
  },
  {
    path: "/profile/:id",
    element: <ViewProfile />
  },
  {
    path: "/blogs/create",
    element: <CreateBlog />
  },
  {
    path: "/blog/:id/add_tags",
    element: <AddTagsToBlogs />
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
  {
    path: "/majors/create",
    element: <CreateMajor />
  },
  {
    path: "/majors/all",
    element: <ViewMajors />
  },
  {
    path: "/major/:id",
    element: <ViewMajor />
  },
  {
    path:  "/major/:id/update",
    element: <UpdateMajor />
  },
  {
    path:  "/major/:id/delete",
    element: <DeleteMajor />
  },
  {
    path: "/tags/create",
    element: <CreateTags />
  },
  {
    path: "/tags/all",
    element: <ViewTags />
  },
  {
    path: "/tag/:id",
    element: <ViewTag />
  },
  {
    path:  "/tag/:id/update",
    element: <UpdateTag />
  },
  {
    path:  "/tag/:id/delete",
    element: <DeleteTag />
  },
  {
    path: "/years/create",
    element: <CreateYears />
  },
  {
    path: "/years/all",
    element: <ViewYears />
  },
  {
    path: "/year/:id",
    element: <ViewYear />
  },
  {
    path:  "/year/:id/update",
    element: <UpdateYear />
  },
  {
    path:  "/year/:id/delete",
    element: <DeleteYear />
  },
  {
    path: "/experiment",
    element: <SearchForBlogs />
  },
  {
    path: "/settings", 
    element: <Settings />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
