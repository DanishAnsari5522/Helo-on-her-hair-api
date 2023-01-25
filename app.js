const express = require('express')
const app = express()
const multer=require('multer');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const http = require("http")
const server = http.createServer(app)

//for upload image

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg");
        }
    })
}).single("productImage");

// const orders = require("./routes/order.routes")
const auth = require("./routes/auth.route")
const postroute = require("./routes/post.route")
const user = require("./routes/user.route")
const follow = require("./routes/follow.route")
const uploadr=require("./routes/upload.routes")

const PORT = process.env.PORT || 5000
const authlogin = require("./middleware/auth.middleware")

app.use(express.json())
app.use(cors())

// app.use("/v1/orders", orders)
app.use("/v1/auth", auth)
app.use("/v1/post", authlogin, postroute)
app.use("/v1/user", authlogin, user)
app.use("/v1/follow", authlogin, follow)
app.use("/v1/upload",upload,uploadr)


app.get("/", (req, res) => {
    res.status(200).json({ msg: "welcome v1" })
})




// app.post("/upload",upload,(req,res)=>{
//     res.send("File Upload");
// })

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