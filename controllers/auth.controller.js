const admin=require("../models/admin.model")
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        let { name, password } = req.body;
        console.log(req.body);
        if (!name || !password) {
            return res.status(400).json({ success: false, message: "mobile ,password are required" })
        }

        const data = await admin.findOne({ name,password })
        if (!data) {
            return res.status(500).json({ success: false, message: "user don't exist with this name" })
        }
    

        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, data: { id: data._id, name: data.name}, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


module.exports = {
    login,
}