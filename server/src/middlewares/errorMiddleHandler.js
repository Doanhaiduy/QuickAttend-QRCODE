const errorMiddleHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log('doan hai duy', err.name);
    if (err.name === 'ValidationError') {
        let errors = {};

        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });

        res.status(400).json({
            message: err.message,
            statusCode: 400,
            errors,
        });
        next();
    }
    res.status(statusCode).json({
        message: err.message,
        statusCode,
        stack: err.stack,
    });

    next();
};

module.exports = errorMiddleHandler;
