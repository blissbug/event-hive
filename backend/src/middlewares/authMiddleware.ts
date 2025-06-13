import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    let headers = req.headers;
    let token = headers["authorization"];

    if(token){
        //@ts-ignore
        let decoded = jwt.verify(token,process.env.JWT_TOKEN);
        //@ts-ignore
        req.userId = decoded._id;
        next();
    }
    else{
        res.json({
            message:"No token found!"
        })
    }
}   

export default authMiddleware;