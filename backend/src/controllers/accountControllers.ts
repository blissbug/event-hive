import {Request,Response} from "express"
import AdminAccount from "../models/AdminAccount";
import { encrypt,decrypt} from "../utils/encrypt";
import { createHash } from "crypto";


const HASH_SALT = process.env.HASH_SALT 

function getDeterministicHash(data: string): string {
    return createHash('sha256').update(data + HASH_SALT).digest('hex');
}

function getMask(text:string|undefined){
    if(text){
        const maskedPart = "X".repeat(text.length-4);
        const split = text.slice(-4);
        return maskedPart+split;
    }
    
}

export async function getAccountDetails(req:Request,res:Response){
    //get unmasked complete details
    const {accountId} = req.params;

    const accountDetails = await AdminAccount.findOne({_id:accountId,admin_id:req.session.userId});

    if(!accountDetails){
        res.json({
            message:"No account found!"
        })
        return;
    }

    let data : {
            "account_number"?:string,
            "ifsc_code"?:string,
            "beneficiary_name" ?: string,
            "account_type"?:string
    } = {};
 
    data["account_number"] = decrypt(accountDetails.account_number);
    data["ifsc_code"] = decrypt(accountDetails.ifsc_code);
    data["beneficiary_name"] = decrypt(accountDetails.beneficiary_name);
    data["account_type"] = accountDetails.account_type;

    res.json({
        message:"details found",
        data,
    })
}

export async function getAllAccountDetails(req:Request,res:Response){
    const userId = req.session.userId;
    const accountDetails = await AdminAccount.find({admin_id:userId});
    let data = {};
    data = accountDetails.map((item)=>{
        let res : {
            "account_number"?:string,
            "ifsc_code"?:string,
            "beneficiary_name" ?: string,
            "account_type"?:string
        } = {};

        
        res["account_number"] = getMask(decrypt(item.account_number));
        res["ifsc_code"] = decrypt(item.ifsc_code);
        res["beneficiary_name"] = decrypt(item.beneficiary_name);
        res["account_type"] = item.account_type;

        return res;
        
    })
    res.status(200).json({
        data,
        message:"data sent!"
    });
}

export async function postAccountDetails(req:Request,res:Response){
    let {account_number,ifsc_code,beneficiary_name,account_type} = req.body;

    //check if it already exists
    let encryptedAccountNumber = getDeterministicHash(account_number);
    const account = await AdminAccount.findOne({admin_id:req.session.userId,hash_account:encryptedAccountNumber});

    //if account exists, decrypt to check for confirmation
    if(account){
        const existingAccount = decrypt(account.account_number);
        if(existingAccount===account_number){
            res.json({
                message:"Account exists"
            })
            return;
        }
    }

    //encrypt it
    let e_accountNumber = encrypt(account_number);
    let e_ifsc_code = encrypt(ifsc_code);
    let e_beneficiary_name = encrypt(beneficiary_name);

    //store it
    await AdminAccount.create({
        admin_id:req.session.userId,
        account_number:e_accountNumber,
        hash_account:encryptedAccountNumber,
        ifsc_code:e_ifsc_code,
        beneficiary_name:e_beneficiary_name,
        account_type,
    })

    res.status(200).json({
        message:"Success!"
    })
    return;
}

export async function updateAccountDetails(req:Request,res:Response){
    const {accountId} = req.params;

    let {account_number,ifsc_code,beneficiary_name,account_type} = req.body;

    let e_accountNumber = encrypt(account_number);
    let e_ifsc_code = encrypt(ifsc_code);
    let e_beneficiary_name = encrypt(beneficiary_name);
    let encryptedAccountNumber = getDeterministicHash(account_number); 

    //TODO: add check if the account number already exixts
    await AdminAccount.findOneAndUpdate({_id:accountId,admin_id:req.session.userId}, {
        account_number: e_accountNumber,
        hash_account: encryptedAccountNumber, 
        ifsc_code: e_ifsc_code,
        beneficiary_name: e_beneficiary_name,
        account_type, 
    }, { new: true });

    res.status(200).json({
        message:"Updated!"
    })
}

export async function deleteAccountDetails(req:Request,res:Response){
    const {accountId} = req.params;
    await AdminAccount.findOneAndDelete({_id:accountId,admin_id:req.session.userId});
    res.status(200).json({
        message:"Deleted!"
    })

}


