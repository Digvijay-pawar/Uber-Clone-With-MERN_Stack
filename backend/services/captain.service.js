const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}

module.exports.generateAuthToken = function (email) {
    return jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "24h" });
}

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports.comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports.getCaptainByEmail = async (email) => {
    return await captainModel.findOne({ email });
}

module.exports.blacklistToken = async (token) => {
    await blacklistTokenModel.create({ token });
}