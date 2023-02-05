const express = require("express")
const user = express.Router()
const { userform,detail,cartupload,getCartById,deleteCart} = require("../controllers/user.controller")
user.post("/", userform)
user.get("/detail", detail)
user.post("/cartupload",cartupload)
user.route("/getCartById").get(getCartById)
user.delete("/deletecart/:id",deleteCart)



module.exports = user