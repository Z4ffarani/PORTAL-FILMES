import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx' 
import Collection from './pages/Collection.jsx'
import Genres from './pages/Genres.jsx'
import GenreMovies from './pages/GenreMovies.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import MoviePopup from './components/MoviePopup.jsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/collection', element: <Collection /> },
      {
        path: '/genres', element: <Genres />,
        children: [
          { path: ':genreId', element: <GenreMovies /> }
        ]
      },
      { path: 'movie/:id', element: <MoviePopup /> }, 
      { path: '*', element: <PageNotFound /> }, 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)