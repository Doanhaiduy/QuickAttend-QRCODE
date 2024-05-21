const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/configs/db');
const errorMiddleHandler = require('./src/middlewares/errorMiddleHandler');
const { verifyToken } = require('./src/middlewares/authMiddleware');

const UserRouter = require('./src/routers/userRouter');
const AuthRouter = require('./src/routers/authRouter');
const EventRouter = require('./src/routers/eventRouter');
const AttendanceRouter = require('./src/routers/AttendanceRouter');

//dotenv config
dotenv.config();

//db connection
connectDB();

//init express
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//PORT
const PORT = process.env.PORT || 3000;

//routes
app.get('/', (req, res) => {
    res.send('Server is ready!!');
});

app.use(`${process.env.BASE_URL}/auth`, AuthRouter);
app.use(`${process.env.BASE_URL}/users`, verifyToken, UserRouter);
app.use(`${process.env.BASE_URL}/events`, verifyToken, EventRouter);
app.use(`${process.env.BASE_URL}/attendances`, verifyToken, AttendanceRouter);

app.use(errorMiddleHandler);

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
