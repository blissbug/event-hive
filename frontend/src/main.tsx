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
import EventDashboard from './features/EventDashboard/index.tsx'
import store from './app/store.ts'
import {Provider } from "react-redux"

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
    },
    {
      path:"/create",
      element:<EventDashboard/>
    }
  ]
},

])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={appRoutes}/>
  </Provider>
)
