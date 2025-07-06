import { Request,Response } from "express";
import Event from "../models/Event";

async function getEvents(req:Request,res:Response){
    const data = await Event.find({});
    res.status(200).json({
        data,
        message:"Data fetched successfully"
    })
}

export default getEvents;