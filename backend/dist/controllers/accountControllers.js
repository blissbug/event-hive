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
exports.getAccountDetails = getAccountDetails;
exports.getAllAccountDetails = getAllAccountDetails;
exports.postAccountDetails = postAccountDetails;
exports.updateAccountDetails = updateAccountDetails;
exports.deleteAccountDetails = deleteAccountDetails;
const AdminAccount_1 = __importDefault(require("../models/AdminAccount"));
function getAccountDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountId } = req.params;
        const accountDetails = yield AdminAccount_1.default.findById(accountId);
        res.json({
            message: "details found"
        });
    });
}
function getAllAccountDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.session.userId;
        const accountDetails = yield AdminAccount_1.default.find({ admin_id: userId });
        //get encrypted data
        //decrypt it
        //mask it
        //send to frontend
        res.status(200).json({
            data: ''
        });
    });
}
function postAccountDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { account_number, ifsc_code, beneficiary_name, account_type } = req.body;
        //check if it already exists
        //encrypt it
        //store it
        res.status(200).json({
            message: "Success!"
        });
        return;
    });
}
function updateAccountDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountId } = req.params;
        let { account_number, ifsc_code, beneficiary_name, account_type } = req.body;
        yield AdminAccount_1.default.findByIdAndUpdate(accountId, {
            account_number,
            account_type,
            beneficiary_name,
            ifsc_code
        });
        res.status(200).json({
            message: "Updated!"
        });
    });
}
function deleteAccountDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountId } = req.params;
        yield AdminAccount_1.default.findByIdAndDelete(accountId);
        res.status(200).json({
            message: "Deleted!"
        });
    });
}
