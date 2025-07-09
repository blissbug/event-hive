"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const accountControllers_1 = require("../controllers/accountControllers");
const AccountRouter = (0, express_1.Router)();
AccountRouter.get("/:accountId", authMiddleware_1.default, isAdminMiddleware_1.default, accountControllers_1.getAccountDetails);
AccountRouter.get("/", authMiddleware_1.default, isAdminMiddleware_1.default, accountControllers_1.getAllAccountDetails);
AccountRouter.post("/", authMiddleware_1.default, isAdminMiddleware_1.default, accountControllers_1.postAccountDetails);
AccountRouter.put("/:accountId", authMiddleware_1.default, isAdminMiddleware_1.default, accountControllers_1.updateAccountDetails);
AccountRouter.delete("/:accountId", authMiddleware_1.default, isAdminMiddleware_1.default, accountControllers_1.deleteAccountDetails);
exports.default = AccountRouter;
