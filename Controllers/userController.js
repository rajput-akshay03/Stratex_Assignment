const prisma = require("../database/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
// for registering the user
 const register = async(req,res)=>{
      const {name,email,password,role}=req.body;
      // checking whether email format is correct or not
      const checkEmail = validator.isEmail(email)
      if(!checkEmail)
        return res.json({
            message:"Please Provide valid email"
        })
     // checking whether this email already exists or not
      const findUser = await prisma.user.findUnique({
          where:{
            email
          }
      });
      if(findUser)
    {
        return res.json({
            message:"email already exists"
        })
    }
    const hashPassword= await bcrypt.hash(password,10);
    const newUser = await prisma.user.create({
        data:{
            name:name,
            password:hashPassword,
            email:email,
            role:role
        }
    })
    const token= await jwt.sign({
        userId:newUser.id,
        email:newUser.email,
        role:role
    },
    process.env.JWT_SECRET,{
        expiresIn:"30d"
    }
)
    return res.json({
        message:"new user created",
        data:newUser,
        token:token
    })
} 
// login of user
const login = async(req,res)=>{
    const {password,email,role}= req.body;
       if(!password || !email)
        {
            return res.json({
                 message:"information required"
            })
        }
    const checkEmail = validator.isEmail(email)
      if(!checkEmail)
        return res.json({
            message:"Please Provide valid email"
        })
       const findUser = await prisma.user.findUnique({
               where:{
                  email:email
               }
       })
       if(!findUser)
        {
            return res.json({
                 message:"NO User Exists With this Email"
            })
        }
      if(role!==findUser.role)
        {
            return res.json({
                 message:"Wrong Role"
            })
        }
        const userPassword= findUser.password;
        const compare = await bcrypt.compare(password,userPassword);
        if(!compare)
           return res.json({
             message:"wrong password"
          })
       const token= await jwt.sign({
            userId:findUser.id,
            email:findUser.email,
            role:role
        },
        process.env.JWT_SECRET,{
            expiresIn:"30d"
        }
    )
      res.json({
          message:"login successfully",
          token:token,
          user:findUser
      })
}

module.exports= {register,login};