import { Request,Response,NextFunction } from "express";

const isAdminMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    if (!req.user || req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
    }
    next();
}

export default isAdminMiddleware;