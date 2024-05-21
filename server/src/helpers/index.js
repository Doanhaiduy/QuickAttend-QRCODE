const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const jwt = require('jsonwebtoken');
const { ref, uploadBytesResumable, getDownloadURL, uploadString } = require('firebase/storage');
const { storage } = require('../configs/firebase.config');

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const getJwtToken = async (email, id) => {
    return jwt.sign({ email, id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const genUsername = (fullName) => {
    fullName = fullName.trim();
    fullName = fullName.toLowerCase();
    const replacements = [
        { from: /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, to: 'a' },
        { from: /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, to: 'e' },
        { from: /ì|í|ị|ỉ|ĩ/g, to: 'i' },
        { from: /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, to: 'o' },
        { from: /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, to: 'u' },
        { from: /ỳ|ý|ỵ|ỷ|ỹ/g, to: 'y' },
        { from: /đ/g, to: 'd' },
    ];

    replacements.forEach((replacement) => {
        fullName = fullName.replace(replacement.from, replacement.to);
    });

    const username = fullName.replace(/\s+/g, '');
    return username + Math.floor(Math.random() * 10000);
};

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + time;
    return dateTime;
};

const uploadImage = async (file, type) => {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `images/${dateTime}_${Math.random().toString(36).substring(2)}.png`);
        let snapshot;

        if (type === 'data_url') {
            snapshot = await uploadString(storageRef, file, 'data_url');
        }
        if (type === 'file') {
            const metadata = {
                contentType: file.mimetype,
            };
            snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
        }

        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        throw new Error(error);
    }
};

const encryptData = (data, key) => {
    const cipherText = CryptoJS.AES.encrypt(data, key).toString();
    return cipherText;
};

const decryptData = (cipherText, key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, key);
        if (bytes.sigBytes > 0) {
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            return originalText;
        }
    } catch (error) {
        return 'error';
    }
};

const checkTimeStatus = (startAt, endAt) => {
    const currentTime = new Date();
    const startTime = new Date(startAt);
    const endTime = new Date(endAt);
    if (currentTime < startTime) {
        return 'Upcoming';
    } else if (currentTime > startTime && currentTime < endTime) {
        return 'Ongoing';
    } else {
        return 'Expired';
    }
};

module.exports = {
    hashedPassword,
    getJwtToken,
    genUsername,
    giveCurrentDateTime,
    uploadImage,
    encryptData,
    decryptData,
    checkTimeStatus,
};

('https://firebasestorage.googleapis.com/v0/b/quickattend-dbb9b.appspot.com/o/images%2F2024-5-1913%3A50%3A56_8dkw9i6oqyc.png?alt=media&token=611147b6-63b3-4ddc-84ca-326023ff7af4');
