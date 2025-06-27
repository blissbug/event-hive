import { useState } from "react";
import Navbar from "../home/-components/Navbar";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Card from "../home/-components/Card";
import Footer from "../home/-components/Footer";

export default function EventProfile(){
    const [fav,setFav] = useState(false);
    return(
        <>
        <Navbar/>
        <div className="w-full relative h-[80vh] overflow-hidden ">
            <img src="https://images.unsplash.com/photo-1571310100246-e0676f359b42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
            className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute">
                <div className="mx-12 mt-12 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-8 text-white hover:rounded-full hover:p-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                    <div className="text-white top-[65vh] absolute w-[95vw] left-6">
                        <div className="flex flex-row-reverse justify-between "> 
                            <div className="rounded-full bg-white size-9 flex items-center justify-center m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    onClick={()=>{setFav(!fav)}}
                                    viewBox="0 0 20 20" fill="currentColor" 
                                    className={`size-5 ${fav ? "text-pink-500" : "text-gray-400"} `}>
                                    <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-5xl font-semibold">Dream World Wide in Luxembourg</h1>
                            </div>
                        </div>
                        <h2 className="my-4 text-lg">Aug 31, 2025</h2>
                    </div>                
            </div>
        </div>
        <div className="bg-gray-100 ">
            <div className="w-4/6 mx-auto mb-7 h-full py-8">
            <div className="grid grid-cols-5 h-full gap-5">
                <div className="col-span-3">
                    {/*Description Card*/}
                    <div className="bg-white rounded-lg h-fit p-3 my-2">
                        <h1 className="text-black text-2xl my-5 font-bold">Description</h1>
                        <p className="text-gray-500 text-lg font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est explicabo porro sint fuga dolore possimus voluptate, ipsa, mollitia, neque quae enim. Enim modi ipsam nemo eveniet natus harum delectus iusto ab praesentium voluptatibus nihil magni autem, laudantium et neque aspernatur consequuntur totam ducimus possimus beatae.</p>
                        <p className="text-gray-500 text-lg font-normal my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, fuga.</p>
                    </div>
                    {/*Event Location Card*/}
                    <div className="h-fit p-3 bg-white rounded-lg my-4">
                        <h1 className="text-black text-2xl my-5 font-bold">Event Location</h1>
                         {<MapContainer center={[49.6153, 6.13]} zoom={15} scrollWheelZoom={false}
                         className="h-80 w-full">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[49.6153, 6.13]}>
                                <Popup className="bg-red-400">
                                A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>}
                        <p className="text-gray-400 text-lg font-semibold my-2">1 Pl. de l'Europe, 1499 Clausen Luxembourg</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="bg-white rounded-lg h-fit px-4 py-1 my-2 mx-4">
                        <h1 className="text-xl font-semibold my-1">Date & Time</h1>
                        <h2 className=" my-0.5">Monday Sep 14,2025</h2>
                        <h2 className=" my-0.5">At 10:30 PM</h2>
                        <h3 className="text-blue-700 font-semibold my-1.5">Choose Different Date</h3>
                    </div>
                    <div className="flex bg-white rounded-lg mx-4 items-center px-4 py-3 mt-2"><p className="text-pink-400 text-4xl font-bold">$100.00</p><p className="mx-2 text-xl font-semibold text-gray-400">per person</p></div>
                    <div className="rounded-lg h-fit px-4 py-2 my-1">
                        <button className="text-white font-semibold bg-gray-400 hover:bg-pink-500 py-4 rounded-lg w-full cursor-pointer flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="size-6 mx-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>
                            <h1>Share with Friends</h1>
                        </button>
                    </div>
                     <div className=" rounded-lg h-fit px-4 py-2 my-1">
                        <button className="text-white font-semibold bg-green-500 py-4 rounded-lg w-full cursor-pointer">BUY TICKET</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white py-20">
            <div className="mx-auto w-4/6">
            <h1 className="text-2xl font-bold py-5">Similiar Events You May Like</h1>
            <div className="flex ">
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
        </div>
            <Footer/>
        </div>

        </>
    )
}