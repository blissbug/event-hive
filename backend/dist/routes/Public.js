"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicControllers_1 = __importDefault(require("../controllers/publicControllers"));
const publicRouter = (0, express_1.Router)();
publicRouter.get('/', publicControllers_1.default);
exports.default = publicRouter;
