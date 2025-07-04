"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const User_1 = __importDefault(require("./routes/User"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const encrypt_1 = __importDefault(require("./utils/encrypt"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "reached!"
    });
});
(0, encrypt_1.default)("tyyy");
app.use((0, express_session_1.default)({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60, //time-to-live - automatic removal
        autoRemove: 'interval',
        autoRemoveInterval: 10,
        touchAfter: 24 * 3600
    }),
    cookie: {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000
    }
}));
//routes
app.use('/api/user', User_1.default);
(0, db_1.default)();
app.listen(8080, () => {
    console.log("app is active at 8080");
});
