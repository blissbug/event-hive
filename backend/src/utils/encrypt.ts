import crypto, { BinaryLike, CipherGCMTypes } from "crypto"
import "dotenv/config"

const ALGO: crypto.CipherGCMTypes = process.env.ENCRYPTION_METHOD as crypto.CipherGCMTypes;

export function generate32ByteKey(){
  const cipherKey =crypto.pbkdf2('secret', 'salt', 100000, 32,
         'sha512', (err, derivedKey) => {

    if (err) throw err;
    return derivedKey.toString('base64');

  });
  return cipherKey;
}

function encrypt(data:BinaryLike)
{
  if(!process.env.SECRET_KEY || !process.env.ENCRYPTION_METHOD || process.env.SECRET_KEY===undefined){
    throw new Error("Keys not defined properly or not accessible! Please chceck and ensure proper keys are set.")
  }  

  //generate unique nonce
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO,process.env.SECRET_KEY,nonce);

  let preEncrypted = cipher.update(data);
  let postEncrypted = cipher.final();
  let authTag = cipher.getAuthTag();

  const fullCiphertextBuffer = Buffer.concat([preEncrypted, postEncrypted]);

  let nonceString = nonce.toString('base64');
  let authTagString = authTag.toString('base64');
  const fullCiphertext = fullCiphertextBuffer.toString("base64");

  const finalEncryptedData = fullCiphertext+":"+nonceString+":"+authTagString;
  return finalEncryptedData;
}

function decrypt(text:String){
  try{
    if(!process.env.SECRET_KEY || !process.env.ENCRYPTION_METHOD || process.env.SECRET_KEY===undefined){
    throw new Error("Keys not defined properly or not accessible! Please chceck and ensure proper keys are set.")
    }
    const data = text.split(":");
    let fullCiphertext = data[0];
    let nonceString = data[1];
    let authTagString = data[2];

    let cipherBuffer = Buffer.from(fullCiphertext,'base64');
    let nonceBuffer = Buffer.from(nonceString,'base64');
    let authTagBuffer = Buffer.from(authTagString,'base64');

    const decipher = crypto.createDecipheriv(ALGO,process.env.SECRET_KEY,nonceBuffer);
    decipher.setAuthTag(authTagBuffer);
    const preData = decipher.update(cipherBuffer);
    const postData = decipher.final();

    const bufferResult = Buffer.concat([preData,postData]);
    const decrypted = bufferResult.toString('utf8');
    return decrypted;
  }
  catch(err){
    console.error("Error Occured! decryption not okay",err);
  }
}

export {encrypt,decrypt};