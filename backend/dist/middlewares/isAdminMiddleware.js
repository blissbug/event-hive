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
Object.defineProperty(exports, "__esModule", { value: true });
const isAdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
        return;
    }
    if (req.session.isAdmin === true) {
        next();
    }
    else {
        res.status(403).json({
            message: "User is not admin!"
        });
        return;
    }
});
exports.default = isAdminMiddleware;
