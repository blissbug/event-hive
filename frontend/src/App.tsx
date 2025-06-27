import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './features/home/-components/Navbar'
import Footer from './features/home/-components/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
