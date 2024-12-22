const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({ email});

    if (isUserAlreadyRegistered) {
        return res.status(400).json({ message: "User already registered" });
    }

    try {
        const hashedPassword = await userService.hashPassword(password);

        const user = await userService.createUser({
            firstName: fullName.firstName, 
            lastName: fullName.lastName,
            email,
            password: hashedPassword
        });

        const token = await userService.generateAuthToken(email);

        res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await userService.comparePasswords(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await userService.generateAuthToken(user.email);

        res.cookie("token", token);

        // Exclude password from the response
        user.password = undefined;

        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization && req.headers.authorization.split(" ")[1];

    await userService.blacklistToken(token);
    res.status(200).json({ message: "User logged out successfully" });
}

