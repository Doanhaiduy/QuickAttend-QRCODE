const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = {
    hashedPassword,
    getJwtToken,
    genUsername,
};
