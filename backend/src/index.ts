import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/db";
import UserRouter from "./routes/User";

const app = express();

app.use(cors());
app.use(express.json())

//routes
app.use('/api/user',UserRouter);

connectDB();

app.get("/",(req,res)=>{
    res.json({
        message:"reached!"
    })
})

app.listen(8080,()=>{
    console.log("app is active at 8080")
})