const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;
    const { firstName, lastName } = fullName;

    try {
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstName, 
            lastName,
            email,
            password: hashedPassword
        });

        const token = await userModel.generateAuthToken();

        res.status(201).json({ user, token });
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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = userModel.generateAuthToken();

        // Exclude password from the response
        user.password = undefined;

        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
};
