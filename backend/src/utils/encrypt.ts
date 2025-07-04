import crypto, { BinaryLike } from "crypto"
import "dotenv/config"

//32 byte key - 256 bit key
//create a 12 bit nonce - used once only - called iv
//optional - aad or ad to keep authentication not encryption
//we get a ciphertext and authtag in return
// store all three bitches - nonce, encrypted, auth tag
//transmit aad separately
//possibly concatenate

export function generate32ByteKey(){
  const cipherKey =crypto.pbkdf2('secret', 'salt', 100000, 32,
         'sha512', (err, derivedKey) => {

    if (err) throw err;
    return derivedKey.toString('base64');

  });
  return cipherKey;
}

const ALGO:crypto.CipherGCMTypes = "aes-256-gcm";

function encryptKey(data:BinaryLike){

  if(!process.env.SECRET_KEY || !process.env.ENCRYPTION_METHOD || process.env.SECRET_KEY===undefined){
    throw new Error("Keys not defined properly or not accessible! Please chceck and ensure proper keys are set.")
  }
  //generate unique nonce
  const nonce = crypto.randomBytes(12);
  
  const cipher = crypto.createCipheriv(ALGO,process.env.SECRET_KEY,nonce);
  let authTag = cipher.getAuthTag();
  let preEncrypted = cipher.update(data);
  let postEncrypted = cipher.final();

  const fullCiphertextBuffer = Buffer.concat([preEncrypted, postEncrypted]);

  let nonceString = nonce.toString('base64');
  let authTagString = authTag.toString('base64');
  const fullCiphertext = fullCiphertextBuffer.toString("base64");

  const finalEncryptedData = fullCiphertext+":"+nonceString+":"+authTagString;
  return finalEncryptedData;
}

export default encryptKey;