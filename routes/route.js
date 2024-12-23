const express = require("express")
const schema = require("../schema/schema")
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
})

route.delete("/:id", async(req,res)=>{
      const {id} = req.params;
      try {
        const data = await schema.findByIdAndDelete({_id:id})
        res.status(200).json({
            success:true,
            message:"user delete successfully"
        })
      } catch (error) {
        console.log("error");
        res.status(404).json({
            success:false,
            message:"internal server error"
        })
        
        
      }
})




module.exports = route