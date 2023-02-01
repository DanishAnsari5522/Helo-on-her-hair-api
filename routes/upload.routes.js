const express = require("express")
const upload = express.Router()
const { getProduct,uploadProduct,liveSearch } = require("../controllers/product.controller")
upload.post("/uploadProdut", function (req, resp) {
    uploadProduct
})

upload.route("/").get(getProduct)
upload.get("/search", liveSearch)


module.exports = upload;