import { Request,Response,NextFunction } from "express";

const isAdminMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    if (!req.session.userId) {
        res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
        return;
    }
    if (req.session.isAdmin === true) { 
        next(); 
    }
    else{
        res.status(403).json({
            message:"User is not admin!"
        })
        return;
    }
    }


export default isAdminMiddleware;