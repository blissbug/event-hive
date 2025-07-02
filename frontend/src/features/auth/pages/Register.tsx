import { Link } from "react-router-dom";
import InputElement from "../../../components/InputElement";
import Button from "../../../components/Button";
import { useState } from "react";

function Register(){
    const[admin,setAdmin] = useState(false);
    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        setAdmin(event.target.value=="Admin");
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
                <InputElement placeholder="Enter username" />
                <p className="mt-2 text-gray-500 font-semibold" >Email </p>
                <InputElement placeholder="Enter Email" />
                <p className="mt-2 text-gray-500 font-semibold">Password </p>
                <InputElement placeholder="Enter Password"/>
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
                    checked={!admin}
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
                    checked={admin}
                    onChange={handleChange}

                />
                <span className="mx-3  text-md font-normal text-gray-700">Admin</span>
                </label>
                </div>
                <div className="my-6">
                <Button text={"Create account"} kind={"secondary"}/>
                </div>

            </div>
        </div>
        </>
    )

}

export default Register;