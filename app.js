const express = require('express')
const app = express()
const multer = require('multer');
const cors = require('cors')
const mongoose = require('mongoose')
const uploadm = require('./models/upload.model')
const fileUpload = require('express-fileupload')
const cart = require('./models/Cart')
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

const http = require("http")
const server = http.createServer(app)
app.use(cors())

//Cloudinary
cloudinary.config({
    cloud_name: 'dbz8cdpis',
    api_key: '933379462329688',
    api_secret: 'J_T8_JvOLyPZDsMI6MRm0t1iTl8',
});
//cloudinary

//for upload image

app.use(fileUpload({
    useTempFiles: true
}));

//upload

// const orders = require("./routes/order.routes")
const auth = require("./routes/auth.route")
const user = require("./routes/user.route")
const uploadr = require("./routes/upload.routes")

const PORT = process.env.PORT || 5000
const authlogin = require("./middleware/auth.middleware")

app.use(express.json())


// app.use("/v1/orders", orders)
app.use("/v1/auth", auth)
app.use("/v1/user", user)
app.use("/v1/upload", uploadr)


app.get("/", (req, res) => {
    res.status(200).json({ msg: "welcome v1" })
})


// app.post("/upload", (req, res, next) => {
//     console.log(req.body, req.files);
//     const file = req.files.productImage;
//     cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
//         console.log(result);
//         console.log(result.url);
//         if (!result) {
//             console.log("error");
//         } else {

//             const newupload = new uploadm({
//                 productDetail: req.body.productDetail,
//                 productPrice: req.body.productPrice,
//                 productCategori: req.body.productCategori,
//                 productImage: result.url
//             })
//             newupload.save()
//                 .then(() => res.send('sucsess')).catch(err => console.log(err))
//         }
//     })
// })



app.post("/cart", async (req, res) => {
    try {
        let { productDetail, productPrice, productCategori, productImage, postedBy } = req.body
        const data = await cart.create({ productDetail, productPrice, productCategori, productImage, postedBy })
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
})

app.put("/updateProduct/:id", async (req, res, next) => {
    let result = await uploadm.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
    console.log(req.body);
    const file = req.files.productImage;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result);
        console.log(result.url);
        if (!result) {
            console.log("error");
        } else {

            const newupload = new uploadm({
                productDetail: req.body.productDetail,
                productPrice: req.body.productPrice,
                productCategori: req.body.productCategori,
                productImage: result.url
            })
            newupload.save()
                .then(() => res.send('sucsess')).catch(err => console.log(err))
        }
    })
})

const init = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.mongo_URL)
        server.listen(PORT, () => console.log('server is listening at PORT ' + PORT))
    } catch (error) {
        console.log(error)
    }
}
init()