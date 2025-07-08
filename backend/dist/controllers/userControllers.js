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
exports.logOutController = logOutController;
exports.refreshTokenController = refreshTokenController;
const v4_1 = __importDefault(require("zod/v4"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const crypto_1 = __importDefault(require("crypto"));
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
            //@ts-ignore
            let valid = bcrypt_1.default.compare(password, user.password);
            if (!valid) {
                res.json({
                    message: "Invalid Password or Email"
                });
                return;
            }
            //@ts-ignore
            const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, isAdmin: user.admin }, process.env.JWT_TOKEN, {
                expiresIn: 15 * 60 * 60,
            });
            const refreshToken = crypto_1.default.randomBytes(32).toString('hex');
            //store to redis refresh token - userid, expiration of 7 days
            req.session.refreshToken = refreshToken;
            req.session.userId = user._id.toString();
            req.session.isAdmin = user.admin;
            req.session.save();
            console.log(req.session.isAdmin);
            res.json({
                message: "signed In",
                isAdmin: user.admin,
                accessToken
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
function logOutController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield req.session.destroy((err) => {
            console.log(err);
        });
        res.clearCookie('connect.sid');
        res.status(200).json({
            message: "user logged out!"
        });
        return;
    });
}
function refreshTokenController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userIdFromSession = req.session.userId;
        const isAdminFromSession = req.session.isAdmin;
        if (!req.session.refreshToken || !req.session.userId) {
            res.status(401).json({
                message: "unauthorized"
            });
            return;
        }
        yield req.session.regenerate((err) => { console.log(err); });
        const newRefreshTokenString = crypto_1.default.randomBytes(32).toString('hex');
        req.session.refreshToken = newRefreshTokenString;
        req.session.userId = userIdFromSession;
        req.session.isAdmin = isAdminFromSession;
        //@ts-ignore
        const accessToken = yield jsonwebtoken_1.default.sign({ _id: userIdFromSession, isAdmin: isAdminFromSession }, process.env.JWT_TOKEN, {
            expiresIn: 7 * 60,
        });
        res.status(200).json({
            accessToken
        });
        return;
    });
}
