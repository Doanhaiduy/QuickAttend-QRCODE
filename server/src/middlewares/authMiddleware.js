const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('express-async-handler');

const verifyToken = asyncErrorHandler((req, res, next) => {
    const accessToken = req.headers.authorization;
    const token = accessToken && accessToken.split(' ')[1];

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    } else {
        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET);
            if (verify) {
                next();
            }
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
});

module.exports = {
    verifyToken,
};
