const mongoose = require('mongoose');

const connectDB = async () => {
    const connectString =
        process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_LOCAL;
    try {
        const connect = await mongoose.connect(connectString);
        console.log(`Connect to database successfully: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
