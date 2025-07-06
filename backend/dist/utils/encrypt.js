"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate32ByteKey = generate32ByteKey;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
const ALGO = process.env.ENCRYPTION_METHOD;
function generate32ByteKey() {
    const cipherKey = crypto_1.default.pbkdf2('secret', 'salt', 100000, 32, 'sha512', (err, derivedKey) => {
        if (err)
            throw err;
        return derivedKey.toString('base64');
    });
    return cipherKey;
}
function encrypt(data) {
    if (!process.env.SECRET_KEY || !process.env.ENCRYPTION_METHOD || process.env.SECRET_KEY === undefined) {
        throw new Error("Keys not defined properly or not accessible! Please chceck and ensure proper keys are set.");
    }
    //generate unique nonce
    const nonce = crypto_1.default.randomBytes(12);
    const cipher = crypto_1.default.createCipheriv(ALGO, process.env.SECRET_KEY, nonce);
    let preEncrypted = cipher.update(data);
    let postEncrypted = cipher.final();
    let authTag = cipher.getAuthTag();
    const fullCiphertextBuffer = Buffer.concat([preEncrypted, postEncrypted]);
    let nonceString = nonce.toString('base64');
    let authTagString = authTag.toString('base64');
    const fullCiphertext = fullCiphertextBuffer.toString("base64");
    //TODO: try setting as a json object instead
    const finalEncryptedData = fullCiphertext + ":" + nonceString + ":" + authTagString;
    return finalEncryptedData;
}
function decrypt(text) {
    try {
        if (!process.env.SECRET_KEY || !process.env.ENCRYPTION_METHOD || process.env.SECRET_KEY === undefined) {
            throw new Error("Keys not defined properly or not accessible! Please chceck and ensure proper keys are set.");
        }
        const data = text.split(":");
        let fullCiphertext = data[0];
        let nonceString = data[1];
        let authTagString = data[2];
        let cipherBuffer = Buffer.from(fullCiphertext, 'base64');
        let nonceBuffer = Buffer.from(nonceString, 'base64');
        let authTagBuffer = Buffer.from(authTagString, 'base64');
        const decipher = crypto_1.default.createDecipheriv(ALGO, process.env.SECRET_KEY, nonceBuffer);
        decipher.setAuthTag(authTagBuffer);
        const preData = decipher.update(cipherBuffer);
        const postData = decipher.final();
        const bufferResult = Buffer.concat([preData, postData]);
        const decrypted = bufferResult.toString('utf8');
        return decrypted;
    }
    catch (err) {
        console.error("Error Occured! decryption not okay", err);
    }
}
