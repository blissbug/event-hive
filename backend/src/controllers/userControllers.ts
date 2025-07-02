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
                    message:"Sign Up First!",
                })
                return;
            }

            let valid = bcrypt.compare(password,user.password);

            if(!valid){
                res.json({
                    message:"Invalid Password or Email"
                })
                return;
            }

            //@ts-ignore
            const token = jwt.sign({_id:user._id,isAdmin:user.admin},process.env.JWT_TOKEN);

            res.json({
                message:"sign In",
                isAdmin:user.admin,
                token
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
