"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const v4_1 = require("zod/v4");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const UserRouter = (0, express_1.Router)();
//add zod input validation 
const SignUpValidation = v4_1.z.object({
    name: v4_1.z.string(),
    email: v4_1.z.email(),
    password: v4_1.z.string().min(8)
});
const SignInValidation = v4_1.z.object({
    email: v4_1.z.email(),
    password: v4_1.z.string().min(8),
});
UserRouter.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedData = SignInValidation.parse(req.body);
    let { email, password } = parsedData;
    try {
        let user = yield User_1.default.findOne({
            email,
        });
        if (!user) {
            res.json({
                message: "sign up first!",
            });
            return;
        }
        let valid = bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            res.json({
                message: "invalid password or email"
            });
            return;
        }
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_TOKEN);
        res.json({
            message: "sign In",
            token
        });
        return;
    }
    //add error type
    catch (err) {
        res.json({
            //@ts-ignore
            message: err.message,
        });
    }
}));
UserRouter.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedData = SignUpValidation.parse(req.body);
    let { name, email, password } = parsedData;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            res.json({
                message: "account already present, log in!"
            });
            return;
        }
        let hashedPassword = yield bcrypt_1.default.hash(password, 8);
        user = yield User_1.default.create({
            name,
            email,
            password: hashedPassword
        });
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_TOKEN);
        res.json({
            message: "sign In",
            token
        });
    }
    //add error type
    catch (err) {
        res.json({
            //@ts-ignore
            message: err.message,
        });
    }
}));
exports.default = UserRouter;
