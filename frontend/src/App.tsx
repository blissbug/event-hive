import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './features/home/-components/Navbar'
import Footer from './features/home/-components/Footer'

function App() {

  return (
    <>
    <div className='flex-row min-h-screen '>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
      
    </>
  )
}

export default App
