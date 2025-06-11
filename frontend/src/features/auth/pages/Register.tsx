import { Link } from "react-router-dom";
import InputElement from "../../../components/InputElement";
import Button from "../../../components/Button";

function Register(){
    return(
        <>
        <div className="grid grid-cols-6 gap-5 h-screen w-screen box-border ">
            <div className="col-span-2 bg-linear-to-t from-primary-800 to-primary-900/75 rounded-2xl p-10 text-white font-montserrat m-4">
                <h1 className="font-semibold tracking-wider">EVENTHIVE</h1>
                <div className="my-24">
                    <h1 className="text-4xl font-semibold my-5 leading-12">Start your <br/>journey with us.</h1>
                    <h1 className="text-gray-200">Experience unparalleled events and build vibrant communities. <br />Seamlessly, all in one place</h1>
                </div>
                <div className="mx-12 mt-48">
                </div>
                
            </div>
            <div className="col-span-4 flex-row items-center justify-center p-28">
                <h1 className="text-3xl font-bold font-montserrat my-2">Sign Up</h1>
                <p className="mb-10">Have an account? <Link to="/logIn" className="text-blue-600">Log In</Link></p>
                <p className="mt-2 text-gray-500 font-semibold">Username </p>
                <InputElement placeholder="Enter username" />
                <p className="mt-2 text-gray-500 font-semibold" >Email </p>
                <InputElement placeholder="Enter Email" />
                <p className="mt-2 text-gray-500 font-semibold">Password </p>
                <InputElement placeholder="Enter Password"/>
                <div className="my-6">
                <Button text={"Create account"} kind={"secondary"}/>
                </div>

            </div>
        </div>
        </>
    )

}

export default Register;