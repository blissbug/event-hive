import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './features/home/-components/Navbar'
import Footer from './features/home/-components/Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout,refresh, setLoading } from './features/auth/authSlice'
import type { RootState } from './app/store'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state:RootState) => state.authReducer.isAuthenticated);

    useEffect(()=>{
        async function isLoggedIn(){
          try{
            dispatch(setLoading(true));
            console.log(isAuthenticated);
            const resp = await axios.post(`${BACKEND_URL}/api/user/refresh`,{},{
              withCredentials:true
            });
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
