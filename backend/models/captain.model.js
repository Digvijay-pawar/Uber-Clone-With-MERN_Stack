const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({ 
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            required: [true, 'Vehicle color is required'],
            minlength: [3, 'Vehicle color must be at least 3 characters long'],
        },

        plate: {
            type: String,
            required: [true, 'Vehicle plate is required'],
            minlength: [3, 'Vehicle plate must be at least 3 characters long'],
        },

        capacity: {
            type: Number,
            required: [true, 'Vehicle capacity is required'],
            min: [1, 'Vehicle capacity must be at least 1'],
        },

        vehicleType: {
            type: String,
            required: [true, 'Vehicle type is required'],
            enum: ['car', 'motorcycle', 'auto']
        }
    },

    location :{
        lat: {
            type : Number,
        },
        lng: {
            type : Number,
        }
    }
});

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;