"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStore = void 0;
const redis_1 = require("redis");
const connect_redis_1 = require("connect-redis");
const express_session_1 = __importDefault(require("express-session"));
function connectRedis() {
    let redisClient = (0, redis_1.createClient)({
        username: 'default',
        password: 'suGH8phqLW2OMqWaqlbrCif3ADNaJFVp',
        socket: {
            host: 'redis-18286.c52.us-east-1-4.ec2.redns.redis-cloud.com',
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
const sessionObj = (0, express_session_1.default)({
    store: exports.redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "keyboardcat",
});
exports.default = sessionObj;
