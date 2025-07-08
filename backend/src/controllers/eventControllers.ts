import Event from "../models/Event";
import {Request,Response} from "express"

export async function getAllEventsController(req:Request,res:Response){
    try{
        const data = await Event.find({});
        res.status(200).json({
            data
        })
        return;
    }
    catch(err){
        console.log(err);
    }
}

export async function getAllEventsByAdmin(req:Request,res:Response){
    try{
        const userId = req.session.userId;
        console.log(userId);
        const data = await Event.find({admin:userId});
        res.status(200).json({
            data
        })
        return;

    }
    catch(err){
        console.log(err);
    }
}

export async function createEventController(req:Request,res:Response){
    try{
        let {name, category,tags,location,date,time,imgUrl,description,price,ticketCount,bank_account} = req.body;
        tags = tags.split(" ");
        //depending on the bank account detailsw ekeep on frontend, get bank account properly here and populate it accordingly
        //and ensure encryption
        let admin = req.session.userId;

        const data = await Event.create({
            name,
            admin,
            category,
            tags,
            location,
            date,
            time,
            imgUrl,
            description,
            price,
            ticketCount,
            bank_account
        })

        res.status(200).json({
            message:"event created!"
        })
        return;
    }
    catch(err){
        console.log(err);
        res.status(500);
    }
}

export async function getEventController(req:Request,res:Response){
    try{
        const {eventId} = req.params;
        const data = await Event.findById(eventId);
        if(!data){
            res.status(500).json({
                message:"Event not found",
            })
            return;
        }
        res.json({
            message:"event found",
            data
        })
        return;
    }
    catch(err){
        console.log(err);
        return;
    }
}

export async function deleteEventController(req:Request,res:Response){
    try{
        const {eventId} = req.params;
        const data = await Event.findById(eventId);
        if(!data){
            res.status(404).json({
                message:"Resource not found"
            })
            return;
        }
        const success = await Event.findByIdAndDelete({eventId});
        //add error controls
        console.log(success);
        res.status(200).json({
            message:"Event deleted successfully"
        })
    }
    catch{
        res.status(500).json({
            message:"Error Occured!"
        })
    }
}

