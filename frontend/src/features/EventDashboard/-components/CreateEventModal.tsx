import { type LatLngExpression } from "leaflet";
import { useState } from "react"
import { MapContainer,TileLayer,Popup,Marker, useMapEvent } from "react-leaflet"
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import React, { useRef, useEffect } from 'react';
import { Player } from '@lordicon/react';
import ICON_DATA from "../../../assets/wired-outline-1103-confetti-hover-pinch.json"

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function CreateEventModal({setModal}:{
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}){
    const [step,setStep] = useState(1);
    const [markerPos,setMarkerPos] = useState<LatLngExpression>([50.5, 30.5]);
    const progressBarPercentage = (step/4)*100;
    console.log(progressBarPercentage)

    return(
        <div className="fixed inset-0 bg-gray-500/70 z-50 ">
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
                {/*Progress Bar*/ }
                <div className={`h-0.5 bg-green-400`}
                    style={{ width: `${progressBarPercentage}%` }}></div>
                {/*Event Details*/}
                {step==1 && <EventDetails setStep={setStep}/>}
                {step==2 && <EventMedia markerPos={markerPos} setMarkerPos={setMarkerPos} setStep={setStep}/>}
                {step==3 && <TicketInfo setStep={setStep}/>}
                {step==4 && <Success setStep={setStep}/>}
            </div>
        </div>
    )
}

//step - 1
function EventDetails({setStep}:{
    setStep:React.Dispatch<React.SetStateAction<number>>,
}){

    return(
        <div className="p-6">
            <p className="text-lg font-semibold">Event Title</p>
            <input type="text" placeholder="Enter Name of the Event" className="mb-3 w-full focus:outline-none"/>

            <p className="text-lg font-semibold">Event Category</p>
            <div className="flex flex-wrap mb-3">
                <EventCategory category={"Concert"}/>
                <EventCategory category={"Music"}/>
                <EventCategory category={"Business"}/>
                <EventCategory category={"Food & Drink"}/>
                <EventCategory category={"Performance"}/>
                <EventCategory category={"Workshop"}/>
                <EventCategory category={"Event"}/>
                <EventCategory category={"Meetup"}/>
            </div>

            <p className="text-lg font-semibold">Event Tags</p>
            <input type="text" className="w-full mb-3 focus:outline-none" placeholder="Add tags separated by space"/>

            <p className="text-lg font-semibold">Select Date & Time</p>
            <input type="date" name="" id="" />
            <input type="time" name="" id="" className=""/>

            <div className="flex justify-end">
                <button className="bg-blue-500 rounded-lg px-3 py-1.5 text-white flex items-center text-sm cursor-pointer"
                onClick={()=>{setStep((c)=>c+1)}}>

                    <p>Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div> 
        </div>
    )
}

//step-2 Event info and media
function EventMedia({setMarkerPos,markerPos,setStep}:{
    setMarkerPos:React.Dispatch<React.SetStateAction<LatLngExpression>>,
    markerPos:LatLngExpression,
    setStep:React.Dispatch<React.SetStateAction<number>>,

}){
    return(
        <div className="px-6 py-3">
            <p className="text-lg font-semibold">Location</p>
            <div className="mb-2">
                {<MapContainer center={[49.6153, 6.13]} zoom={15} scrollWheelZoom={false}
                    className="h-40 w-full">
                    <MapClickHandler setMapPos={setMarkerPos}/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={markerPos}>
                        <Popup className="">
                       Mark location of your event!
                        </Popup>
                    </Marker>
                </MapContainer>}
            </div>

            <p className="text-lg font-semibold">Add Event Image</p>
            <div className="flex mb-2">
                <input type="url" name="" id="" placeholder="Add link to the image" className="focus:outline-none w-full"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
            </div>

            <p  className="text-lg font-semibold">Add Event Description</p>
            <textarea className="w-full h-12 focus:outline-none" placeholder="Enter description for the event. Limit to `100-150 words."></textarea>
            <div className="flex justify-between">
                <button className="bg-blue-500 rounded-lg px-3 py-1.5 text-white flex items-center text-sm cursor-pointer"
                onClick={()=>{setStep((c)=>c-1)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    <p>Back</p>
                </button>
                <button className="bg-blue-500 rounded-lg px-3 py-1.5 text-white flex items-center text-sm cursor-pointer"
                onClick={()=>{setStep((c)=>c+1)}}>

                    <p>Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

//step -3
function TicketInfo({setStep}:{
    setStep:React.Dispatch<React.SetStateAction<number>>
}){
    const[selectedPlan,setSelectedPlan] = useState('');
    const[price,setPrice] = useState(0);
    const[count,setCount] = useState(0);

    console.log(price);
    function handlePlanChange(e:React.ChangeEvent<HTMLInputElement>){
        setSelectedPlan(e.target.value);
    }

    return(
        <div className="p-6">
            <p className="text-lg font-semibold">Ticket Type</p>
            <div className="flex">
                <label
                htmlFor="plan-free"
                className="flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 w-fit m-2"
                >
                <input
                    type="radio"
                    id="plan-free"
                    name="planType"
                    value="free"
                    style={{ accentColor: '#3B82F6' }}
                    className=" h-5 w-10 text-blue-500 focus:ring-blue-500 rounded-full"
                    checked={selectedPlan === 'free'}
                    onChange={handlePlanChange}
                />
                <span className="mx-3  text-md font-normal text-gray-700">Free</span>
                </label>
                <label
                htmlFor="paid"
                className="flex items-center p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 w-fit m-2"
                >
                <input
                    type="radio"
                    id="paid"
                    name="planType"
                    value="paid"
                    style={{ accentColor: '#3B82F6' }}
                    className=" h-5 w-10 text-blue-500 focus:ring-blue-500 rounded-full"
                    checked={selectedPlan === 'paid'}
                    onChange={handlePlanChange}
                />
                <span className="mx-3  text-md font-normal text-gray-700">Paid</span>
                </label>
            </div>
            {selectedPlan=="paid" &&
                        <div className="flex items-center m-2">
                            <input type="text" placeholder="Enter UPI" className="focus:border-b-2 focus:border-blue-500 focus:outline-none w-fit" onChange={(e)=>setPrice(Number(e.target.value))}></input>     
                            <p className="text-3xl font-semibold">₹</p>
                            <input type="number" placeholder="" className="focus:border-b-2 focus:border-blue-500 focus:outline-none w-fit" onChange={(e)=>setPrice(Number(e.target.value))}></input>
                        </div>
            }
            <p className="text-lg font-semibold">Ticket Count</p>
            <input type="number" placeholder="" className="focus:border-b-2 focus:border-blue-500 focus:outline-none w-fit m-2" onChange={(e)=>setCount(Number(e.target.value))}></input>
            <div className="flex justify-between">
                <button className="bg-blue-500 rounded-lg px-3 py-1.5 text-white flex items-center text-sm cursor-pointer"
                onClick={()=>{setStep((c)=>c-1)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    <p>Back</p>
                </button>
                <button className="bg-blue-500 rounded-lg px-3 py-1.5 text-white flex items-center text-sm cursor-pointer"
                onClick={()=>{setStep((c)=>c+1)}}>
                    <p>Next</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

//step - 4 
function Success({setStep}:{
    setStep:React.Dispatch<React.SetStateAction<number>>
}){
    const playerRef = useRef<Player>(null);

  useEffect(() => {
    // You can control the animation here, for example:
    playerRef.current?.playFromBeginning();
  }, []); // Empty dependency array means this runs once after initial render

  return (
    <div className="p-6">
    <div className="flex flex-col  items-center">
        <p className="text-lg font-bold ">Congratulations!</p>
        <div className="">
            <Player
            ref={playerRef}
            icon={ICON_DATA}
            size={96} 
            />
        </div>
        <p className="text-lg font-semibold ">Your Event is created</p>
        <p className="text-md ">You can view it on the dashboard.</p>
    </div>
    <div className="flex justify-start my-3">
        <button className="bg-blue-500 rounded-lg px-3 py-1.5  text-white flex items-center text-sm cursor-pointer"
        onClick={()=>{setStep((c)=>c-1)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <p>Back</p>
        </button>
    </div>
    </div>
    )
}

function EventCategory({category}:{
    category:String
}){
    return( 
        <div className="bg-white rounded-3xl border-2 border-blue-500/30 h-fit w-fit p-1.5 m-1 text-sm hover:border-pink-300/40 text-gray-600 cursor-pointer">
            {category}
        </div>
    )
}

function MapClickHandler({setMapPos}:{
    setMapPos:React.Dispatch<React.SetStateAction<LatLngExpression>>
}){
        useMapEvent('click',(e)=>{            
            setMapPos(e.latlng)
        })
        return null;
    }