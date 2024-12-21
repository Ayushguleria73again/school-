const express = require("express")
const schema = require("../schema/schema")
const route = express.Router()

route.get("/", async (req, res) => {
    try {
        const users = await schema.find({})
        res.status(200).json({
            success: true,
            message: users
        })
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "internal server eror"
        })
    }
})






module.exports = route