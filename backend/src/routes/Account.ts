import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import isAdminMiddleware from "../middlewares/isAdminMiddleware";
import { getAccountDetails, postAccountDetails, updateAccountDetails, deleteAccountDetails, getAllAccountDetails } from "../controllers/accountControllers";

const AccountRouter = Router();

AccountRouter.get("/:accountId",authMiddleware,isAdminMiddleware,getAccountDetails);

AccountRouter.get("/",authMiddleware,isAdminMiddleware,getAllAccountDetails);

AccountRouter.post("/",authMiddleware,isAdminMiddleware,postAccountDetails);

AccountRouter.put("/:accountId",authMiddleware,isAdminMiddleware,updateAccountDetails);

AccountRouter.delete("/:accountId",authMiddleware,isAdminMiddleware,deleteAccountDetails);

export default AccountRouter;