const mongoose = require('mongoose');

const upload = new mongoose.Schema({
    productDetail: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true,
    },
    productCategori: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("upload", upload)