const express = require("express")
const upload = express.Router()
const { uploadProduct } = require("../controllers/upload.controller")
upload.post("/uploadProdut", function (req, resp) {
    uploadProduct
})

module.exports = upload;