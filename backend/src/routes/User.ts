import { Router } from "express";
import { signInController, signUpController } from "../controllers/userControllers";
import authMiddleware from "../middlewares/authMiddleware";

const UserRouter = Router();

UserRouter.post("/signin",signInController);

UserRouter.post("/signup",signUpController);

export default UserRouter;