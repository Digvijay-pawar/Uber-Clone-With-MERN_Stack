const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"] 
    },
    password: {
        type: String,
        required: true,
        select: true,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    socketId: {
        type: String
    }
});

userSchema.statics.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

userSchema.statics.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {    
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;