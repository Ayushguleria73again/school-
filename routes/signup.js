const express = require("express")
const joi = require("joi")
const signup =express.Router()
const schema = require("../schema/schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
signup.post("/",async (req,res)=>{ 
    const students = joi.object({
        name:joi.string().required(),
        middle:joi.string().allow(""),
        last:joi.string().required(),
        age:joi.number().required(),
        gender:joi.string().required(),
        email:joi.string().email().required(),
        phone:joi.string().length(10).required(),
        password:joi.string().min(6).max(20).required()
    })
      const tokenstore = jwt.sign({_id:99887766},process.env.KEY)
      const {error} = students.validate(
      req.body
     )
     if (error){
        res.status(500).json({
            success:false,
            message:error.details[0].message
        })
     }
     const checkuser = await schema.findOne({phone:req.body.phone})
     if (checkuser){
        return res.status(400).json({
            success:false,
            message:"Phone no. already exist"
        })
     }
    const hashpassword = await bcrypt.hash(req.body.password,10)
    const newstudent = new schema({
        name:req.body.name,
        middle:req.body.middle,
        last:req.body.last,
        age:req.body.age,
        gender:req.body.gender,
        email:req.body.email,
        phone:req.body.phone,
        password:hashpassword,
        token:tokenstore
    }) 
     const savestudent = await newstudent.save();
    try {
        res.status(201).json({
            success:true,
            message:"user save successfully",
            data:savestudent
        })   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.details[0].message
        })
    }
})
module.exports = signup