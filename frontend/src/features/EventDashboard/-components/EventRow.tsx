import { useState } from "react"

export default function EventRow({header}:{
    header?:boolean
}){
    let [select,setSelect] = useState(false);
    return(
        <div className={`w-full border-b-2 border-gray-200 h-16 grid-cols-7 grid items-center text-center text-xs ${header && "bg-blue-300/15 text-gray-400"}`}>
            <div className="flex items-center">
                <div className={`size-6 border-2 rounded-lg mx-auto flex items-center justify-center ${select?"border-pink-500 bg-pink-500 ":"border-gray-500"} hover:border-pink-500`} onClick={()=>{setSelect(!select)}}>
                    {select &&
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6 text-white">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                    }
                </div>
                <p>Event Name</p>
            </div>
            <p className="col-span-2">Date of Event</p>
            <p>Tickets Sold/Total Tickets</p>
            <p>Price</p>
            <p>End of Sale Date</p>
            {!header && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-6 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>}
        </div>
    )
}