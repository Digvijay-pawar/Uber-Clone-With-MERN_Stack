const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;
    const { firstName, lastName } = fullName;
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    const token = await userModel.generateAuthToken(user);

    res.status(201).json({ user, token });
} 