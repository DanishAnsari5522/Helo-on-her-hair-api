const express = require("express")
const route = express.Router()
const { login } = require("../controllers/auth.controller")

route.post("/login", login)

module.exports = route