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

module.exports = {
    hashedPassword,
    getJwtToken,
};
