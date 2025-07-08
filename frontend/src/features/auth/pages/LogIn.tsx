import InputElement from "../../../components/InputElement";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useRef } from "react";
import axios from "axios";
import { login,setLoading } from "../authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function LogIn(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(){
        const email = emailRef.current ? emailRef.current.value : '';    
        const password = passwordRef.current ? passwordRef.current.value : '';

        //TODO: Add error handling and proper responses on creation 
        try{
            setLoading(true);
            let msg = await axios.post(`${BACKEND_URL}/api/user/signin`,{
            email,
            password,
            })
            const token = msg.data.accessToken;
            login(token);
            //redirect to main page if successful
        }
        catch(err){
            console.log(err);   
        }
        finally{
            setLoading(false);
        } 
    }

    return(
        <>
        <div className="grid grid-cols-6 gap-5 h-screen w-screen box-border ">
            <div className="col-span-2 bg-linear-to-t from-primary-800 to-primary-900/60 p-10 text-white font-montserrat">
                <h1 className="font-semibold tracking-wider">EVENTHIVE</h1>
                <div className="my-24">
                    <h1 className="text-4xl font-semibold my-5 leading-12">Start your <br/>journey with us.</h1>
                    <h1 className="text-gray-200">Experience unparalleled events and build vibrant communities. <br />Seamlessly, all in one place</h1>
                </div>
                <div className="mx-12 mt-48">
                </div>
                
            </div>
            <div className="col-span-4 flex-row items-center justify-center p-28">
                <h1 className="text-3xl font-bold font-montserrat my-2">Log In</h1>
                <p className="mb-10">Dont have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>
                <p className="mt-2 text-gray-500 font-semibold" >Email </p>
                <InputElement placeholder="Enter Email" gotRef={emailRef} />
                <p className="mt-2 text-gray-500 font-semibold">Password </p>
                <InputElement placeholder="Enter Password" gotRef={passwordRef}/>
                <div className="my-6">
                <Button text={"Log In"} kind={"secondary"} onClick={handleSubmit}/>
                </div>

            </div>
        </div>
        </>
    )

}

export default LogIn;