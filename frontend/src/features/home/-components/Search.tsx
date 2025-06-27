import Card from "./Card";

export default function Search(){
    return(
        <div className="w-4/6 mx-auto">
            <div className="my-5 shadow-2xl/40 h-24 w-full grid rounded-lg grid-cols-7 gap-0">
            <div className="col-span-4 flex justify-between items-center mx-auto px-2 rounded-lg border-gray-200 border-2 my-auto">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <div>
                    <input type="text" name="" id="" 
                    className="w-md h-12 text-lg"/>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className="col-span-2 flex">
                <div className="flex justify-between items-center mx-auto px-2 rounded-lg border-gray-200 border-2 my-auto w-2xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <select className="w-full h-12 text-lg">
                        <option value="someOption">Luxemberg</option>
                        <option value="otherOption">Greece</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center items-center col-span-1">
                <div className="bg-pink-400 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-7 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
        </div>
        <div className="my-14 flex justify-between">
            <h1 className="text-3xl font-semibold">Events Near Luxemberg</h1>
            <div className="flex justify-end">
                <div className="px-2 rounded-lg border-gray-200 border-2 my-auto mx-1 w-36">
                    <select className="w-full h-12 text-lg">
                        <option value="someOption">Weekdays</option>
                        <option value="otherOption">Weekend</option>
                    </select>
                </div>
                <div className="px-2 rounded-lg border-gray-200 border-2 my-auto mx-1 w-36">
                    <select className="w-full h-12 text-lg">
                        <option value="someOption" className="w-full h-12 text-lg">Category</option>
                        <option value="otherOption" className="w-full h-12 text-lg">Music</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>


        </div>

        </div>
        
    )
}