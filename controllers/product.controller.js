const upload = require("../models/upload.model")


const uploadProduct = async (req, res) => {
    try {
        let { productDetail, productPrice, productCategori } = req.body
        // console.log(req.body);
        let { productImage } = req.file.filename;
        res.send("File Upload" + req.file.filename);
        if (!productDetail || !productPrice || !productCategori) {
            return res.status(400).json({ success: false, message: "productdetail , productprice and productcategori are required" })
        } else {
            const data = await upload.create({ productDetail, productPrice, productCategori, productImage })
            console.log(req.body)
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getProduct = async (req, res) => {
    try {
        const data = await upload.find();
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: "server error" })
    }
}


const getProductById = async (req, res) => {
    try {
        let _id = req.query.id
        if (!_id) {
            return res.status(404).json({ success: false, message: "id is not provided" })
        }
        if (mongoose.Types.ObjectId.isValid(_id)) {
            _id = mongoose.Types.ObjectId(_id)
            const userInfo = await upload.findOne({ _id }).select('_id name email phone gender')
            if (!userInfo) {
                return res.status(404).json({ success: false, message: 'user not found' })
            }
            
            return res.status(200).json({
                success: true, data: {
                    productDetail: userInfo.productDetail,
                    _id: userInfo._id,
                    productPrice: userInfo.productPrice,
                    productCategori: userInfo.productCategori,
                    productImage: userInfo.productImage,
                }
            })
        } else {
            return res.status(401).json({ success: false, message: "invalid id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


const liveSearch = async (req, res) => {
    try {
        const { name } = req.query
        const skip = Number(req.query.skip) || 0

        const data = await upload.find({ productCategori: { $regex: '^' + name, $options: 'i' } }).select("productDetail productPrice productCategori productImage _id ").sort({ datetime: -1 }).skip(skip).limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}


module.exports = {
    uploadProduct,
    getProduct,
    getProductById,
    liveSearch
}