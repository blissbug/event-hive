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
exports.getAllEventsController = getAllEventsController;
exports.getAllEventsByAdmin = getAllEventsByAdmin;
exports.createEventController = createEventController;
exports.getEventController = getEventController;
exports.deleteEventController = deleteEventController;
const Event_1 = __importDefault(require("../models/Event"));
function getAllEventsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Event_1.default.find({});
            res.status(200).json({
                data
            });
            return;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function getAllEventsByAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.session.userId;
            console.log(userId);
            const data = yield Event_1.default.find({ admin: userId });
            res.status(200).json({
                data
            });
            return;
        }
        catch (err) {
            console.log(err);
        }
    });
}
function createEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, category, tags, location, date, time, imgUrl, description, price, ticketCount, bank_account } = req.body;
            tags = tags.split(" ");
            //depending on the bank account detailsw ekeep on frontend, get bank account properly here and populate it accordingly
            //and ensure encryption
            let admin = req.session.userId;
            const data = yield Event_1.default.create({
                name,
                admin,
                category,
                tags,
                location,
                date,
                time,
                imgUrl,
                description,
                price,
                ticketCount,
                bank_account
            });
            res.status(200).json({
                message: "event created!"
            });
            return;
        }
        catch (err) {
            console.log(err);
            res.status(500);
        }
    });
}
function getEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { eventId } = req.params;
            const data = yield Event_1.default.findById(eventId);
            if (!data) {
                res.status(500).json({
                    message: "Event not found",
                });
                return;
            }
            res.json({
                message: "event found",
                data
            });
            return;
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
}
function deleteEventController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { eventId } = req.params;
            const data = yield Event_1.default.findById(eventId);
            if (!data) {
                res.status(404).json({
                    message: "Resource not found"
                });
                return;
            }
            const success = yield Event_1.default.findByIdAndDelete({ eventId });
            //add error controls
            console.log(success);
            res.status(200).json({
                message: "Event deleted successfully"
            });
        }
        catch (_a) {
            res.status(500).json({
                message: "Error Occured!"
            });
        }
    });
}
