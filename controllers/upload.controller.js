const uploadm = require("../models/upload.model")
const upload = async (req, res) => {
    try {
        let { productDetail, productPrice, productCategori } = req.body
        let {productImage}=req.file.productImage;
        if (!productDetail || !productPrice || !productCategori) {
            return res.status(400).json({ success: false, message: "productdetail , productprice and productcategori are required" })
        }else{
            const data = await uploadm.create({ productDetail, productPrice, productCategori,productImage })
            console.log(req.body)
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    upload
}