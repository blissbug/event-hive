import mongoose from "mongoose";
import "dotenv/config"

const connectDB = () => {
    //@ts-ignore
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MongoDB Connected!")
    }).catch((err)=>{
        console.log(err.message);
    })
}

export default connectDB;