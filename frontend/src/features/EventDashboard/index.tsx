
import { useState } from "react";
import Card from "./-components/Card"
import EventRow from "./-components/EventRow"
import CreateEventModal from "./-components/CreateEventModal";

export default function EventDashboard(){

    const [modal,setModal] = useState(true);

    return(
        <div className="bg-gray-100">
            {modal && <CreateEventModal setModal={setModal}/>}
            <div className="min-h-fit  mx-16 p-5">
                <div className="flex justify-between px-4 pt-4 items-center">
                    <p className="text-3xl font-semibold">Hey User</p>
                    <button className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer"
                    onClick={()=>{setModal(true)}}>Create an Event</button>

                </div>
                <div className="grid grid-cols-4 h-fit my-2.5 ">
                   <Card/>
                   <Card/>
                   <Card/>
                   <Card/>
                </div>
                <div>
                    <div className="flex justify-between p-2">
                        <p className="mx-2 text-2xl font-semibold">About your events!</p>
                        <div className="flex items-center border-gray-200 border-2 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mx-1 text-gray-500">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                            </svg>
                        <input type="text" placeholder="Search" className="w-fit" />
                        </div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg m-2">
                        <EventRow header={true}/>
                        <EventRow/>
                        <EventRow/>
                        <EventRow/>
                        <EventRow/>
                    </div>
                </div>
            </div>
        </div> 
    )
}