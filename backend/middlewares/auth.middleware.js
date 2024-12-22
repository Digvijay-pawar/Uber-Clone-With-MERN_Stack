const blacklistTokenModel = require("../models/blacklistToken.model");
const userServices = require("../services/user.service");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token});

    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userServices.getUserByEmail(decoded.email);

        req.user = user;
        
        return next();
        
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}