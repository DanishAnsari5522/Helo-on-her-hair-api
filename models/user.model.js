const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("user", user)