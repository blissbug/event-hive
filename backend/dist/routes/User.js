"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/signin", userControllers_1.signInController);
UserRouter.post("/signup", userControllers_1.signUpController);
exports.default = UserRouter;
