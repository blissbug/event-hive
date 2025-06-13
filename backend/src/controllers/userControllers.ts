import { Request,Response } from "express";
import z from "zod/v4";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

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
                    message:"sign up first!",
                })
                return;
            }

            let valid = bcrypt.compare(password,user.password);

            if(!valid){
                res.json({
                    message:"invalid password or email"
                })
                return;
            }

            //@ts-ignore
            const token = jwt.sign({_id:user._id},process.env.JWT_TOKEN);

            res.json({
                message:"sign In",
                token
            })
            return;
        }
    //add error type
    catch(err){
        res.json({
            //@ts-ignore
            message:err.message,
        })
    } 
    
}


const SignUpValidation = z.object({
  name: z.string(),
  email:z.email(),
  password:z.string().min(8)
});

export async function signUpController(req:Request,res:Response){
    let parsedData = SignUpValidation.parse(req.body);
    let {name,email,password} = parsedData;

    try {
            let user = await User.findOne({email});

            if(user){
                res.json({
                    message:"account already present, log in!"
                })
                return;
            }

            let hashedPassword = await bcrypt.hash(password,8);

            user = await User.create({
                name,
                email,
                password:hashedPassword
            })

            //@ts-ignore
            const token = jwt.sign({_id:user._id},process.env.JWT_TOKEN);

            res.json({
                message:"sign Up",
                token
            })
        }
    //add error type
    catch(err){
        res.json({
            //@ts-ignore
            message:err.message,
        })
    }
}