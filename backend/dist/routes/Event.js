"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middlewares/isAdminMiddleware"));
const eventControllers_1 = require("../controllers/eventControllers");
const EventRouter = (0, express_1.Router)();
EventRouter.get("/all", eventControllers_1.getAllEventsController);
EventRouter.get("/events/", authMiddleware_1.default, isAdminMiddleware_1.default, eventControllers_1.getAllEventsByAdmin);
EventRouter.post("/create", authMiddleware_1.default, isAdminMiddleware_1.default, eventControllers_1.createEventController);
EventRouter.get("/:eventId", eventControllers_1.getEventController);
EventRouter.delete("/:eventId", authMiddleware_1.default, isAdminMiddleware_1.default, eventControllers_1.deleteEventController);
exports.default = EventRouter;
