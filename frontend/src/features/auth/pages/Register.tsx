import { Link } from "react-router-dom";
import InputElement from "../../../components/InputElement";
import Button from "../../../components/Button";
import { useRef, useState } from "react";
import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Register(){
    const [isAdmin,setIsAdmin] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        setIsAdmin(event.target.value=="Admin");
    }

    async function handleSubmit(){
        const name = nameRef.current ? nameRef.current.value : '';
        const email = emailRef.current ? emailRef.current.value : '';    
        const password = passwordRef.current ? passwordRef.current.value : '';

        //TODO: Add error handling and proper responses on creation 
        let msg = await axios.post(`${BACKEND_URL}/api/user/signup`,{
            name,
            email,
            password,
            isAdmin,
        })

        console.log(msg.data.message);
    }

    return(
        <>
        <div className="grid grid-cols-6 gap-5 h-screen w-screen box-border ">
            <div className="col-span-2 bg-linear-to-t from-primary-800 to-primary-900/60 px-10 text-white font-montserrat">
                <h1 className="font-semibold tracking-wider py-5">EVENTHIVE</h1>
                <div className="my-24">
                    <h1 className="text-4xl font-semibold my-5 leading-12">Start your <br/>journey with us.</h1>
                    <h1 className="text-gray-200">Experience unparalleled events and build vibrant communities. <br />Seamlessly, all in one place</h1>
                </div>
                <div className="mx-12 mt-48">
                </div>
                
            </div>
            <div className="col-span-4 flex-row items-center justify-center px-28">
                <h1 className="text-3xl font-bold font-montserrat my-2 py-3">Sign Up</h1>
                <p className="mb-10">Have an account? <Link to="/logIn" className="text-blue-600">Log In</Link></p>
                <p className="mt-2 text-gray-500 font-semibold">Username </p>
                <InputElement placeholder="Enter username" gotRef={nameRef}/>
                <p className="mt-2 text-gray-500 font-semibold" >Email </p>
                <InputElement placeholder="Enter Email" gotRef={emailRef}/>
                <p className="mt-2 text-gray-500 font-semibold">Password </p>
                <InputElement placeholder="Enter Password" gotRef={passwordRef}/>
                <p className="mt-2 text-gray-500 font-semibold">Select Role:</p>
                <div className="flex">
                <label
                htmlFor="User"
                className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 w-fit my-2 mr-2"
                >
                <input
                    type="radio"
                    id="User"
                    name="userType"
                    value="User"
                    style={{ accentColor: '#3B82F6' }}
                    className=" h-5 w-10 text-blue-500 focus:ring-blue-500 rounded-full"
                    checked={!isAdmin}
                    onChange={handleChange}
                />
                <span className="mx-3  text-md font-normal text-gray-700">User</span>
                </label>
                <label
                htmlFor="Admin"
                className="flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 w-fit m-2"
                >
                <input
                    type="radio"
                    id="Admin"
                    name="userType"
                    value="Admin"
                    style={{ accentColor: '#3B82F6' }}
                    className=" h-5 w-10 text-blue-500 focus:ring-blue-500 rounded-full"
                    checked={isAdmin}
                    onChange={handleChange}

                />
                <span className="mx-3  text-md font-normal text-gray-700">Admin</span>
                </label>
                </div>
                <div className="my-6">
                <Button text={"Create account"} kind={"secondary"}
                onClick={handleSubmit}
                />
                </div>

            </div>
        </div>
        </>
    )

}

export default Register;