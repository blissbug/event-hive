"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const eventControllers_1 = require("../controllers/eventControllers");
const eventRouter = (0, express_1.Router)();
eventRouter.get("/all", eventControllers_1.getAllEventsController);
eventRouter.get("/events/", authMiddleware_1.default, isAdminMiddleware_1.default, eventControllers_1.getAllEventsByAdmin);
eventRouter.post("/create", authMiddleware_1.default, isAdminMiddleware_1.default, eventControllers_1.createEventController);
eventRouter.get("/:eventId", eventControllers_1.getEventController);
eventRouter.delete("/:eventId", authMiddleware_1.default, isAdminMiddleware_1.default, eventControllers_1.deleteEventController);
exports.default = eventRouter;
