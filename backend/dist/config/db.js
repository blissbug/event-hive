"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    mongoose_1.default.connect("mongodb://localhost:27017/", {
        dbName: "event-hive"
    }).then(() => {
        console.log("MongoDB Connected!");
    }).catch((err) => {
        console.log(err.message);
    });
};
exports.default = connectDB;
