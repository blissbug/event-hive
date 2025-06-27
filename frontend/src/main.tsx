import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import "leaflet/dist/leaflet.css"
import Events from './features/home/pages/EventDetails.tsx'
import EventProfile from './features/EventProfile/index.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Register from './features/auth/pages/Register.tsx'
import LogIn from './features/auth/pages/LogIn.tsx'

const appRoutes = createBrowserRouter([
  {
    path:'/register',
    element:<Register/>,
  },
  {
    path:'/login',
    element:<LogIn/>,
  },
  {
  path:'/',
  element:<App />,
  //defines outlets
  children:[
    {
      path:"/",
      element:<Events/>
    },
    {
      path:"/events/:id",
      element:<EventProfile/>
    }
  ]
},

])

createRoot(document.getElementById('root')!).render(
      <RouterProvider router={appRoutes}/>
)
