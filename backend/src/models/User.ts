import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        require:true,
    },
    admin:{
        type:Boolean,
        default:false,
        required:true,
    }
})

const User = mongoose.model("User",UserSchema);

export default User;