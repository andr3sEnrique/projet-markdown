import CryptoJS from 'crypto-js';

export const encryptString = (text, password) => {
    return CryptoJS.AES.encrypt(text, password).toString();
};

export const decryptString = (encryptedText, password) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (!originalText) {
            throw new Error('Invalid password');
        }

        return originalText;
    } catch (err) {
        console.error(err);
        throw err;
    }
}