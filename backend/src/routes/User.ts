import { Router } from "express";
import { signInController, signUpController,logOutController, refreshTokenController } from "../controllers/userControllers";

const UserRouter = Router();

UserRouter.post("/signin",signInController);

UserRouter.post("/signup",signUpController);

UserRouter.post("/logout",logOutController);

UserRouter.post("/refresh",refreshTokenController);

export default UserRouter;