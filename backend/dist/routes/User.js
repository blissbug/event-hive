"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const UserRouter = (0, express_1.Router)();
UserRouter.post("/signin", userControllers_1.signInController);
UserRouter.post("/signup", userControllers_1.signUpController);
UserRouter.get("/events", authMiddleware_1.default, (req, res) => {
    var _a;
    console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    res.json({
        user: "exists!"
    });
});
exports.default = UserRouter;
