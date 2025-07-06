"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStore = void 0;
const redis_1 = require("redis");
const connect_redis_1 = require("connect-redis");
const express_session_1 = __importDefault(require("express-session"));
require("dotenv/config");
function connectRedis() {
    let redisClient = (0, redis_1.createClient)({
        username: 'default',
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_DB_URI,
            port: 18286
        }
    });
    redisClient.connect().catch(console.error);
    return redisClient;
}
exports.redisStore = new connect_redis_1.RedisStore({
    client: connectRedis(),
    prefix: "myapp:",
});
const redisSession = (0, express_session_1.default)({
    store: exports.redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "keyboardcat",
});
exports.default = redisSession;
