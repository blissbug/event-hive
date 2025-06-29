import { Link } from "react-router-dom"
import EventHiveLogo from "../../../components/EventHiveLogo"
export default function Navbar(){
    return(
        <div className="bg-white w-full h-16 flex justify-between items-center border-b-2 border-gray-200">
            <div className="flex p-4">
                <div className="mx-6 font-semibold text-lg flex items-center">
                    {/*TODO: add a logo and custom font*/ }
                    <EventHiveLogo type={"blue"}/>
                    <p className="mx-2">EventHive</p>
                </div>
            </div>
            <div className="flex">
                    <p className="mx-9">Home</p>
                    <p className="mx-9">Events</p>
                    <p className="mx-9">Community</p>
                    <p className="mx-9"><Link to='/create'>Create</Link></p>
            </div>
            <div className="p-6 flex items-center">
                {/*TODO: Make a resuable component of button according to the size*/ }
                <button className="bg-blue-500 px-5 py-2 rounded-lg text-white">Login</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" 
                className="size-9 ml-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </div>
        </div>
    )
}