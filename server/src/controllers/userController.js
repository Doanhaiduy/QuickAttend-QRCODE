const { getJwtToken, hashedPassword, genUsername } = require('../helpers');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { handleSendMail } = require('../utils/nodemailer');
const asyncErrorHandler = require('express-async-handler');

const LoginUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const exitingUser = await UserModel.findOne({
        email,
    });

    if (!exitingUser) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }

    const isMatch = await bcrypt.compare(password, exitingUser.password);

    if (!isMatch) {
        return res.status(401).json({
            status: 'error',
            message: 'Email or password is incorrect!',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
            fullName: exitingUser.fullName,
            email: exitingUser.email,
            id: exitingUser._id,
            accessToken: await getJwtToken(exitingUser.email, exitingUser._id),
        },
    });
});

const RegisterUser = asyncErrorHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    const exitingUser = await UserModel.findOne({ email });
    if (exitingUser) {
        return res.status(401).json({
            status: 'error',
            message: 'User already exists!',
        });
    }

    const newHashedPassword = await hashedPassword(password);
    const User = new UserModel({
        fullName,
        email,
        password: newHashedPassword,
        username: genUsername(fullName),
    });
    await User.save();
    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
            fullName: User.fullName,
            email: User.email,
            id: User._id,
            username: User.username,
            accessToken: await getJwtToken(User.email, User._id),
        },
    });
});

const ForgotPassword = asyncErrorHandler(async (req, res) => {
    const { email } = req.body;
    const exitingUser = await UserModel.findOne({ email });
    if (!exitingUser) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const text = `Hi ${exitingUser.fullName},

    We received a request to reset the password for the ${exitingUser.username} account associated with your email address, ${email}.

    **Here's what you need to know:**

    * No changes have been made to your account yet.

    * If you **DID NOT** request a new password, please let us know immediately by replying to this email to ensure the security of your account.

    **Important:**

    * We recommend **not** sending your new password directly in the email. This is a security risk.

    Please use the new password below:
    ${verificationCode}

    Thank you for choosing QuickAttend!

    Best Regards,
    QuickAttend Team!`;
    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333;">Hi ${exitingUser.fullName},</h1>
            <p>We received a request to reset the password for the ${exitingUser.fullName} account associated with your email address, ${email}.</p>
            <h2 style="color: #333;">Here's what you need to know:</h2>
            <ul>
                <li>No changes have been made to your account yet.</li>
                <li>If you <strong>DID NOT</strong> request a new password, please let us know immediately by replying to this email to ensure the security of your account.</li>
                <li> This password can only be used once.</li>
            </ul>
            <h2 style="color: #333;">Important:</h2>
            <ul>
                <li>We recommend <strong>not</strong> sending your new password directly in the email. This is a security risk.</li>
            </ul>
            <p>Please use the new password below:</p>
            <h1 style="color: #333;">${verificationCode}</h1>
            <p>Thank you for choosing QuickAttend!</p>
            <p>Best Regards,</p>
            <p>QuickAttend Team!</p>
        </div>
    </div>
    `;

    const data = {
        from: `Support QuickAttend Application <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Password for QuickAttend Application',
        text,
        html,
    };

    try {
        await handleSendMail(data);
        res.status(200).json({
            status: 'success',
            message: 'Verification code has been sent to your email!',
            data: {
                email,
                code: verificationCode,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while sending email!',
        });
    }
});

const Verification = asyncErrorHandler(async (req, res) => {
    const { email, fullName } = req.body;
    const exitingUser = await UserModel.findOne({ email });
    if (exitingUser) {
        return res.status(400).json({
            status: 'error',
            message: 'User already exists!',
        });
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const text = `Hi ${fullName},

                Welcome to QuickAttend! We're excited to have you on board. To complete your account setup, please use the verification code below:

                Verification Code: ${verificationCode}

                Please enter this code in the verification section of your account settings to activate your account. If you didn't sign up for QuickAttend, you can ignore this email.

                Thank you for choosing QuickAttend!

                Best Regards,
                QuickAttend Team!
                `;
    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333;">Hi ${fullName},</h1>
            <p>Welcome to QuickAttend! We're excited to have you on board. To complete your account setup, please use the verification code below, this code will be valid only for 60 second.:</p>
            <p style="font-size: 20px; font-weight: bold; color: #333;">Verification Code: ${verificationCode}</p>
            <p>Please enter this code in the verification section of your account settings to activate your account. If you didn't sign up for QuickAttend, you can ignore this email.</p>
            <p>Thank you for choosing QuickAttend!</p>
            <p>Best Regards,</p>
            <p>QuickAttend Team!</p>
        </div>
    </div>
`;
    const data = {
        from: `Support QuickAttend Application <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to QuickAttend',
        text,
        html,
    };

    try {
        await handleSendMail(data);
        res.status(200).json({
            status: 'success',
            message: 'Verification code has been sent to your email!',
            data: {
                email,
                code: verificationCode,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while sending email!',
        });
    }
});

const ResetPassword = asyncErrorHandler(async (req, res) => {
    const { email, newPassword } = req.body;
    const existingUser = await UserModel.findOne({
        email,
    });

    if (!existingUser) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }

    const newHashedPassword = await hashedPassword(newPassword);
    existingUser.password = newHashedPassword;
    await existingUser.save();
    res.status(200).json({
        status: 'success',
        message: 'Password reset successfully!',
    });
});

const GetAllUsers = asyncErrorHandler(async (req, res) => {
    const users = await UserModel.find({});
    res.status(200).json({
        status: 'success',
        message: 'All users fetched successfully!',
        count: users.length,
        data: users,
    });
});

const GetUserById = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'User fetched successfully!',
        data: user,
    });
});

const UpdateUser = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const { fullName, email, password, imageURL } = req.body;
    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.imageURL = imageURL || user.imageURL;
    user.password = password ? await hashedPassword(password) : user.password;
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User updated successfully!',
        data: user,
    });
});

module.exports = {
    LoginUser,
    RegisterUser,
    ForgotPassword,
    Verification,
    ResetPassword,
    UpdateUser,
    GetAllUsers,
    GetUserById,
};
