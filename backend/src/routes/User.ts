import { Router } from "express";
import { signInController, signUpController } from "../controllers/userControllers";
import authMiddleware from "../middlewares/authMiddleware";

const UserRouter = Router();

UserRouter.get("/signin",signInController);

UserRouter.get("/signup",signUpController);

UserRouter.get("/events",authMiddleware,(req,res)=>{
    //@ts-ignore
    console.log(req.userId);
    res.json({
        user:"exists!"
    })
})

export default UserRouter;