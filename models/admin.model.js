const mongoose = require('mongoose')

const admin = {
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}

module.exports =mongoose.model("admin",admin)