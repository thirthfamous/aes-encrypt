const crypto = require('crypto');

function hexStringToBase64String(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }

    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');

    return base64String;
}


function aesDecrypt(post, key, iv, isDecrypt) {
    if (isDecrypt) {
        post = hexStringToBase64String(post)
        const decrypted = Buffer.from(post, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
        
        let plaintext = decipher.update(decrypted, 'binary', 'utf8');
        plaintext += decipher.final('utf8');

        return plaintext;
    }

    return post;
}

function aesEncrypt(plaintext, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
    
    let encryptedBuffer = cipher.update(plaintext, 'utf8', 'binary');
    encryptedBuffer += cipher.final('binary');
    
    return Buffer.from(encryptedBuffer, 'binary').toString('base64');
}

// Example usage
const plaintext = "hai hallo";
const encryptedData = "5d4344e61812ac9e42f502f811fe0af1fb4b83b87fd1153e3c14c498c53ca5c105c2acb809f0c5625e3e12c4574d1c9512e167517ce4124ef3d5636b1385b50b71ae8ce16b0ca63c3802a79b6f25d5db";
const decryptionKey = "azR2N3F4a3pycXFxd2M2dG5ya3E4MjBrbmYzZzM0YWU="; // Replace with your actual decryption key
const iv = "enZjZmptNTEybWhvb2U4Mg=="; // Replace with your actual initialization vector

const decryptedResult = aesDecrypt(encryptedData, decryptionKey, iv, true);
// const encryptData = aesEncrypt(plaintext, decryptionKey, iv);
console.log(decryptedResult);
