import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './features/home/-components/Navbar'
import Footer from './features/home/-components/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout,refresh, setLoading } from './features/auth/authSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  const dispatch = useDispatch();

    useEffect(()=>{
        async function isLoggedIn(){
          try{
            dispatch(setLoading(true));
            const resp = await axios.post(`${BACKEND_URL}/api/user/refresh`);
            let accessToken = resp.data.accessToken; 
            dispatch(refresh(accessToken));
          }
          catch(err:any){
            if (err.response && err.response.status === 401){   
              dispatch(logout());
            }
            else{
              console.log(err);
            }
          }
          finally{
            console.log("");
            dispatch(setLoading(false));
          }
        }
        isLoggedIn();
  },[])

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
