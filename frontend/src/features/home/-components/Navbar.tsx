export default function Navbar(){
    return(
        <div className="bg-white w-full h-16 flex justify-between items-center">
            <div className="flex p-6">
                <div className="mx-6 font-semibold text-lg">
                    {/*TODO: add a logo and custom font*/ }
                    Event-Hive
                </div>
            </div>
            <div className="flex">
                    <p className="mx-9">Home</p>
                    <p className="mx-9">Events</p>
                    <p className="mx-9">Community</p>
                    <p className="mx-9">Create</p>
            </div>
            <div className="p-6 flex items-center">
                {/*TODO: Make a resuable component of button according to the size*/ }
                <button className="bg-blue-500 px-5 py-2 rounded-lg text-white">Login</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="size-6 ml-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </div>
        </div>
    )
}