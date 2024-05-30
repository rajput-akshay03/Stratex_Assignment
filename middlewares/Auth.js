const express= require("express");
const prisma= require("../database/dbConnection");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// for checking whether user have a valid token or not
const Authorize = async(req,res,next)=>{
    const token = req.header("Authorization").replace("Bearer ","");
    if(!token)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"token is missing"
                }
            )
        }
    let decode;
    try{
      decode = jwt.verify(token,process.env.JWT_SECRET);   
    }
    catch(err){
        if(!decode){
             return res.json({
                 message:"wrong token"
            })}
    }
    console.log(decode);
    req.user = decode;
    next();
}
// checking whether a user is Seller or not
const isSeller=async(req,res,next)=>{
        const role = req.user.role;
        if(role!="Seller")
              return res.json({
              message:"user is not authorized for this task"
            })
       next()
} 
// checking whether the user is Buyer or not
const isBuyer= async(req,res,next)=>{
        const role = req.user.role;
        if(role!="Buyer")
              return res.json({
              message:"Seller is not authorized for this task"
            })
       next()
}
module.exports={Authorize,isSeller,isBuyer};