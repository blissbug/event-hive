"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const UserRouter = (0, express_1.Router)();
UserRouter.get("/signin", userControllers_1.signInController);
UserRouter.get("/signup", userControllers_1.signUpController);
UserRouter.get("/events", authMiddleware_1.default, (req, res) => {
    //@ts-ignore
    console.log(req.userId);
    res.json({
        user: "exists!"
    });
});
exports.default = UserRouter;
