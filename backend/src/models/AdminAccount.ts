import mongoose, { Schema } from "mongoose";

const AdminAccountSchema = new mongoose.Schema({
    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    account_number:{
        type: String,
        required:true
    },
    hash_account:{
        type:String,
        required:true
    },
    ifsc_code:{
        type: String,
        required:true
    },
    beneficiary_name:{
        type: String,
        required:true
    },
    account_type:{
        type:String,
        required:true
    },
},{timestamps:true})

const AdminAccount = mongoose.model('AdminAccount',AdminAccountSchema);

export default AdminAccount;