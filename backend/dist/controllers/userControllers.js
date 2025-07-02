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
exports.signInController = signInController;
exports.signUpController = signUpController;
const v4_1 = __importDefault(require("zod/v4"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
//add zod input validation 
const SignInValidation = v4_1.default.object({
    email: v4_1.default.email(),
    password: v4_1.default.string().min(8),
});
function signInController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let parsedData = SignInValidation.parse(req.body);
        let { email, password } = parsedData;
        try {
            let user = yield User_1.default.findOne({
                email,
            });
            if (!user) {
                res.json({
                    message: "Sign Up First!",
                });
                return;
            }
            let valid = bcrypt_1.default.compare(password, user.password);
            if (!valid) {
                res.json({
                    message: "Invalid Password or Email"
                });
                return;
            }
            //@ts-ignore
            const token = jsonwebtoken_1.default.sign({ _id: user._id, isAdmin: user.admin }, process.env.JWT_TOKEN);
            res.json({
                message: "sign In",
                isAdmin: user.admin,
                token
            });
            return;
        }
        catch (err) {
            if (err instanceof Error) {
                res.json({
                    message: err.message
                });
            }
            else {
                console.error("Ann error occured!");
            }
        }
    });
}
//signup validation with zod
const SignUpValidation = v4_1.default.object({
    name: v4_1.default.string(),
    email: v4_1.default.email(),
    password: v4_1.default.string().min(8),
    isAdmin: v4_1.default.boolean(),
});
function signUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let parsedData = SignUpValidation.parse(req.body);
        let { name, email, password, isAdmin } = parsedData;
        try {
            let user = yield User_1.default.findOne({ email });
            if (user) {
                res.json({
                    message: "Account already present, log in!"
                });
                return;
            }
            let hashedPassword = yield bcrypt_1.default.hash(password, 8);
            user = yield User_1.default.create({
                name,
                email,
                password: hashedPassword,
                admin: isAdmin,
            });
            res.json({
                message: "User created! Please proceed to Log In",
            });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error("Caught an Error object:", err.message);
            }
            else {
                console.log("something occured!");
            }
        }
    });
}
