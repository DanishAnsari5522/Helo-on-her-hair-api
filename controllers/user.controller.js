const user = require("../models/user.model")
const cart=require('../models/Cart')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const mongoose = require('mongoose');


const userform = async (req, res) => {
    try {
        let { name, email, phone, gender } = req.body
        if (!name || !email || !phone || !gender) {
            return res.status(400).json({ success: false, message: "name, email ,phone ,gender are required" })
        }
        if (isNaN(phone)) {
            return res.status(400).json({ success: false, message: "invalid mobile number (NaN)" })
        }
        console.log(name, email, phone, gender);
        if (phone.toString().length === 10) {

            // create
            const data = await user.create({ name, email, phone, gender })
            console.log(data);
            res.send(data);
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


const cartupload=async (req,res)=>{
    try {
        let { productDetail,productPrice,productCategori,productImage,postedBy } = req.body
            const data = await cart.create({ productDetail,productPrice,productCategori,productImage,postedBy })
            console.log(data);
            res.send(data);
    }catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

// const getCartById = async (req, res) => {
//     try {
//         let postedBy = req.query.id
//         if (!postedBy) {
//             return res.status(404).json({ success: false, message: "id is not provided" })
//         }
   
//             const userInfo = await cart.find({postedBy}).select('_id productDetail productPrice productCategori productImage')
//             if (!userInfo) {
//                 return res.status(404).json({ success: false, message: 'user not found' })
//             }

//             return res.status(200).json({
//                 success: true, data: {
//                     productDetail: userInfo.productDetail,
//                     _id: userInfo._id,
//                     productPrice: userInfo.productPrice,
//                     productCategori: userInfo.productCategori,
//                     productImage: userInfo.productImage,
//                 }
//             })
        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: "server error" })
//     }
// }

const getCartById = async (req, res) => {
    try {
        const { postedBy } = req.query
        const skip = Number(req.query.skip) || 0

        const data = await cart.find({ postedBy: { $regex: '^' + postedBy, $options: 'i' } }).select("productDetail productPrice productCategori productImage _id ").sort({ datetime: -1 }).skip(skip).limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}

const deleteCart = async (req, res) => {
    try {
        const { id: peoductID } = req.params;
        const task = await cart.findOneAndDelete({ _id: peoductID })
        if (!task) {
            return res.status(400).json({ success: false, message: "Incorrect id" })
        }
        res.status(200).json({ task })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })

    }

}

module.exports = {
    userform,
    detail,
    cartupload,
    getCartById,
    deleteCart
}