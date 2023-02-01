const express = require("express")
const user = express.Router()
const { userform,detail} = require("../controllers/user.controller")
user.post("/", userform)
user.get("/detail", detail)

module.exports = user