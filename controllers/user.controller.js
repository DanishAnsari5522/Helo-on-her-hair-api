const user = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const mongoose = require('mongoose');


const userform = async (req, res) => {
    try {
        let { name, email, phone, gender, password } = req.body
        if (!name || !email || !phone || !gender || !password) {
            return res.status(400).json({ success: false, message: "name, email ,phone ,gender,password are required" })
        }
        if (isNaN(phone)) {
            return res.status(400).json({ success: false, message: "invalid mobile number (NaN)" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "password must be greater than 7 digit" })
        }


        if (phone.toString().length === 10) {
            const varify = await user.findOne({ phone })
            // return res.json({varify});
            if (varify) {
                if (varify.accountCreated) {
                    return res.status(401).json({ success: false, message: "User already exists" })
                } else {
                    // update
                    password = bcrypt.hashSync(password, 10);
                    const data = await user.findByIdAndUpdate(varify._id, { name, email, phone, gender, password }, { new: true })
                }
            } else {
                // create
                password = bcrypt.hashSync(password, 10);
                const data = await user.create({ name, email, phone, gender, password })
            }
        } else {
            return res.status(400).json({ success: false, message: "invalid mobile number" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const detail = async (req, res) => {
    try {
        const data = await user.find();
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, error: "server error" })
    }
}


module.exports = {
    userform,
    detail
}