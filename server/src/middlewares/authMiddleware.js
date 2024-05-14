const sendEmail = async (req, res, next) => {
    console.log('Email sent');
    next();
};

const verifyCode = async (req, res, next) => {
    console.log('Verification code sent');
    next();
};

const verifyToken = async (req, res, next) => {
    console.log('Token verified');
    next();
};

module.exports = {
    sendEmail,
    verifyCode,
    verifyToken,
    getTokenJwt,
};
