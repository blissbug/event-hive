import { Request,Response } from "express";
import z from "zod/v4";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import crypto from "crypto"
import "dotenv/config";


//add zod input validation 

const SignInValidation = z.object({
    email:z.email(),
    password:z.string().min(8),
})

export async function signInController(req:Request,res:Response){
    let parsedData = SignInValidation.parse(req.body);
    let {email,password} = parsedData;
    try {
            let user = await User.findOne({
                email,
            })

            if(!user){
                res.json({
                    message:"Sign Up First!",
                })
                return;
            }

            //@ts-ignore
            let valid = bcrypt.compare(password,user.password);

            if(!valid){
                res.json({
                    message:"Invalid Password or Email"
                })
                return;
            }

            //@ts-ignore
            const accessToken = jwt.sign({_id:user._id,isAdmin:user.admin},process.env.JWT_TOKEN,{
                expiresIn:15*60*60,                
            });

            const refreshToken =   crypto.randomBytes(32).toString('hex');

            //store to redis refresh token - userid, expiration of 7 days

            req.session.refreshToken = refreshToken;
            req.session.userId = user._id.toString();
            req.session.isAdmin = user.admin;

            res.json({
                message:"signed In",
                isAdmin:user.admin,
                accessToken
            })
            return;
        }
    catch(err:unknown){
        if(err instanceof Error){
            res.json({
                message:err.message
            })
        }
        else{
            console.error("Ann error occured!")
        }   
    }  
}

//signup validation with zod
const SignUpValidation = z.object({
  name: z.string(),
  email:z.email(),
  password:z.string().min(8),
  isAdmin:z.boolean(),
});

export async function signUpController(req:Request,res:Response){
    let parsedData = SignUpValidation.parse(req.body);
    let {name,email,password,isAdmin} = parsedData;

    try {
            let user = await User.findOne({email});

            if(user){
                res.json({
                    message:"Account already present, log in!"
                })
                return;
            }

            let hashedPassword = await bcrypt.hash(password,8);

            user = await User.create({
                name,
                email,
                password:hashedPassword,
                admin:isAdmin,
            })

            res.json({
                message:"User created! Please proceed to Log In",
            })
        }
    catch(err:unknown){
            if (err instanceof Error) {
                console.error("Caught an Error object:", err.message);
            }
            else{
                console.log("something occured!")
            }
        } 
    }

export async function logOutController(req:Request,res:Response){
    await req.session.destroy((err)=>{
        console.log(err);
    });
    res.clearCookie('connect.sid');

    res.status(200).json({
        message:"user logged out!"
    })
    return;
}

export async function refreshTokenController(req:Request,res:Response){
    const userIdFromSession = req.session.userId;
    const isAdminFromSession = req.session.isAdmin;

    if(!req.session.refreshToken || !req.session.userId){
        res.status(401).json({
            message:"unauthorized"
        })
        return;
    }
    await req.session.regenerate((err)=>{console.log(err)});

    const newRefreshTokenString = crypto.randomBytes(32).toString('hex');

    req.session.refreshToken = newRefreshTokenString;
    req.session.userId = userIdFromSession;
    req.session.isAdmin = isAdminFromSession;

    //@ts-ignore
    const accessToken = await jwt.sign({_id:userIdFromSession,isAdmin:isAdminFromSession},process.env.JWT_TOKEN,{
                expiresIn:7*60,
    });

    res.status(200).json({
        accessToken
    })
    return;
}
