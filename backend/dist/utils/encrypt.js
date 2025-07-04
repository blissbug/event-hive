"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate32ByteKey = generate32ByteKey;
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
if (!process.env.SECRET_KEY || !process.env.ENCRYPTION_METHOD) {
    throw new Error("Keys not set properly, kindly kys!");
}
//32 byte key - 256 bit key
//create a 12 bit nonce - used once only - called iv
//optional - aad or ad to keep authentication not encryption
//we get a ciphertext and authtag in return
// store all three bitches - nonce, encrypted, auth tag
//transmit aad separately
//possibly concatenate
function generate32ByteKey() {
    const cipherKey = crypto_1.default.pbkdf2('secret', 'salt', 100000, 32, 'sha512', (err, derivedKey) => {
        if (err)
            throw err;
        return derivedKey.toString('base64');
    });
}
const ALGO = "aes-256-gcm";
function encryptKey(data) {
    const nonce = crypto_1.default.randomBytes(12);
    //@ts-ignore
    const cipher = crypto_1.default.createCipheriv(ALGO, process.env.SECRET_KEY, nonce);
    //@ts-ignore
    let preEncrypted = cipher.update(data);
    //@ts-ignore
    let postEncrypted = cipher.final();
    //encrypted += cipher.final('base64');
    const fullCiphertextBuffer = Buffer.concat([preEncrypted, postEncrypted]);
    let authTag = cipher.getAuthTag();
    let nonceString = nonce.toString('base64');
    let authTagString = authTag.toString('base64');
    const fullCiphertext = fullCiphertextBuffer.toString("base64");
    console.log(fullCiphertext + " " + nonceString + " " + authTagString);
    return fullCiphertext;
}
exports.default = encryptKey;
