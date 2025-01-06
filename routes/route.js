const express = require("express")
const schema = require("../schema/schema")
const bcrypt = require('bcryptjs');
const route = express.Router()

route.get("/", async (req, res) => {
    try {
        const users = await schema.find({})
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "internal server eror"
        })
    }
}).delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await schema.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "user delete successfully"
        })
    } catch (error) {
        console.log("error");
        res.status(404).json({
            success: false,
            message: "internal server error"
        })
    }
}).patch("/:id", async (req, res) => {
    const { id } = req.params;
    let updateData = req.body; 
    if (updateData.password) {
        try {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            updateData.password = hashedPassword; 
        } catch (error) {
            console.error("Error hashing password:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error during password hashing"
            });
        }
    }
    try {
        const updatedDocument = await schema.findOneAndUpdate(
            { _id: id },
            { $set: updateData }
        );
        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: updatedDocument
        });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
module.exports = route