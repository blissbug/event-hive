declare namespace Express{
    interface Request{
        user?:{
            id:String,
            isAdmin:boolean
        }
    }
}