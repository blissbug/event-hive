import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/",{
    dbName:"event-hive"
    }).then(()=>{
        console.log("MongoDB Connected!")
    }).catch((err)=>{
        console.log(err.message);
    })
}

export default connectDB;