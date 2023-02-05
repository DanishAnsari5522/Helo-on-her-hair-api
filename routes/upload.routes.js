const express = require("express")
const upload = express.Router()
const { getProduct,uploadProduct,liveSearch,deleteProduct,getProductById ,updateProduct} = require("../controllers/product.controller")
upload.post("/uploadProdut", function (req, resp) {
    uploadProduct
})

upload.route("/").get(getProduct)
upload.get("/search", liveSearch)
upload.post("/upload",uploadProduct)
upload.delete("/delete/:id",deleteProduct)
// upload.get("/product",getProductById)
upload.route("/product").get(getProductById)
upload.put("/updateProduct/:id",updateProduct)




module.exports = upload;