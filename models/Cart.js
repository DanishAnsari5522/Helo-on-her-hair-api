const mongoose = require('mongoose');

const cart = new mongoose.Schema({
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
    postedBy:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("cart", cart)