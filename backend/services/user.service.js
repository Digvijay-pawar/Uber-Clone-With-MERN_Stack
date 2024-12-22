const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports.generateAuthToken = function (email) {
    return jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "24h" });
}

module.exports.comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports.getUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}

module.exports.blacklistToken = async (token) => {
    await blacklistTokenModel.create({ token });
}