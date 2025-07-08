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
const redis_1 = __importDefault(require("./config/redis"));
const Public_1 = __importDefault(require("./routes/Public"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use(redis_1.default);
app.get("/", (req, res) => {
    if (req.session) {
        req.session.views = (req.session.views || 0) + 1;
        res.send(`Views: ${req.session.views}`);
    }
    else {
        res.send('Session not available');
    }
});
//routes
app.use(Public_1.default);
app.use('/api/user', User_1.default);
app.listen(8080, () => {
    console.log("app is active at 8080");
});
