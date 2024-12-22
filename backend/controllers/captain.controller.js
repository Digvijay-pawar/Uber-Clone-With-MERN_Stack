const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const validationResult = require('express-validator').validationResult;

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

    if (isCaptainAlreadyRegistered) {
        return res.status(400).json({ message: "Captain already registered" });
    }

    try {
        const hashedPassword = await captainService.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = await captainService.generateAuthToken(email);

        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const captain = await captainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await captainService.comparePasswords(password, captain.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await captainService.generateAuthToken(email);

        captain.password = undefined;

        res.cookie("token", token);

        res.status(200).json({ token, captain });
    } catch (error) {
        next(error);
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization && req.headers.authorization.split(" ")[1];

    await captainService.blacklistToken(token);
    res.status(200).json({ message: "User logged out successfully" });
}


