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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
app.use('/api/user', User_1.default);
(0, db_1.default)();
app.get("/", (req, res) => {
    res.json({
        message: "reached!"
    });
});
app.listen(8080, () => {
    console.log("app is active at 8080");
});
