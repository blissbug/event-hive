import mongoose, { Schema } from "mongoose";

const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    location:{
        type:[Number],
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ticketCount:{
        type:Number,
        default:-1,
    },
    bank_account:{
        type:{type:Schema.Types.ObjectId, ref:'AdminAccount'},
        required:true
    }

})

const Event = mongoose.model('Event',EventSchema);

export default Event;