import { useState } from "react"

export default function Card(){
    const [fav,setFav] = useState(false);
    return(
        <div className="w-1/3 h-fit p-2 relative">
            <div className="absolute rounded-full bg-white size-9 flex items-center justify-center m-2">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    onClick={()=>{setFav(!fav)}}
                    viewBox="0 0 20 20" fill="currentColor" 
                    className={`size-5 ${fav ? "text-pink-500" : "text-gray-400"} `}>
                
                    <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                </svg>

            </div>
            <div className="w-fit h-2/3">
                <img src="https://images.unsplash.com/photo-1684679493212-6adfaf58c388?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div className="py-2 pl-2">
                <h1 className="font-bold text-lg">Indonesia - Korean dance show!</h1>
                <h2 className="text-gray-500 font-semibold">Cramacy Theatre, Luxemberg</h2>
                <div className="flex justify-between items-center my-0.5">
                    <div className=" font-semibold pt-2">
                        <p>Monday, Aug 31</p>
                        <p className="text-pink-500">$100.00</p>
                    </div>
                    <div className="">
                        <button className="bg-blue-500 px-3 py-2 text-white font-semibold text-md rounded-md hover:bg-pink-500 hover:shadow-xl/15 transition-shadow duration-200">See More</button>
                    </div>
                </div>
                
            </div>
            


        </div>
    )
}