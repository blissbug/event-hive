export default function Card(){
    return(
        <div className="bg-white active:bg-black col-span-1 h-fit rounded-lg m-3 p-3">
            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 bg-blue-100/30 p-3 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                   className="size-6 text-blue-700 m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                </div>
                <div className="col-span-3 my-auto px-3">
                    <p className="active:text-white font-semibold">Net Sales</p>
                </div>
                <div className="col-span-1 mx-auto my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center">
                <p className="text-lg font-semibold ml-2 mt-2">₹ </p>
                <p className="text-2xl font-semibold my-2">9000</p>
            </div>
            <div className="flex items-center mx-2">
                <p className="font-semibold">₹ 1020.50</p>
                <p className="text-gray-400 font-semibold mx-1.5">gross sales</p>
            </div>
        </div>
    )
}