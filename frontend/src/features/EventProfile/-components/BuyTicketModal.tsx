import { useState } from "react";

function BuyTicketModal({setModal}:{
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}){
    const [count,setCount] = useState(0);

    return(
        <div className="fixed inset-0 bg-gray-500/70 z-[1050] ">
            <div className="h-fit w-2/5 bg-white relative mx-auto my-[15vh] rounded-lg">
                <div className="flex justify-between items-center p-4">
                    <div>
                        <p className="text-lg font-semibold">Dream World Wide in Luxembourg</p>
                        <p className="text-gray-400 font-normal text-sm">Monday, Sep 14, 2020 at 10:30 PM</p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer"
                        onClick={()=>{setModal((c)=>!c)}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className={`h-0.5 bg-green-400`}/>
                <div className="p-6">
                    <p className="text-lg font-semibold">Name</p>
                    <input type="text" placeholder="Enter Name " className="mb-3 w-full focus:outline-none"/>

                    <p className="text-lg font-semibold">Email Adress</p>
                    <input type="text" placeholder="Enter Email Adress" className="mb-3 w-full focus:outline-none"/>

                    <p className="text-lg font-semibold">No. of tickets</p>
                    <div className="flex items-center mb-3">
                        <div className="border-2 border-gray-100 p-1 rounded-lg m-2"
                        onClick={()=>setCount((c)=>c==0 ? 0 : (c-1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                        </div>
                        <div>
                            {count}
                        </div>
                        <div className="border-2 border-gray-100 p-1 rounded-lg m-2"
                            onClick={()=>setCount((c)=>(c+1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-lg font-semibold">Estimated Total</p>
                    <div>
                        ₹{1000*count}
                    </div>

                    <div className=" rounded-lg h-fit py-2 mt-2">
                        <button className="text-white font-semibold bg-green-500 py-4 rounded-lg w-full cursor-pointer"
                        >Proceed to Payment
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BuyTicketModal;