const express=require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {authenticate}=require("../Middleware/authenticate.middleware")

const userRouter=express.Router()

userRouter.use(express.json())

userRouter.post("/signup",async(req,res)=>{
    const {firstName,lastName,email,password}=req.body
    try{
        bcrypt.hash(password,5,async(req,hash)=>{
            const user=new UserModel({firstName,lastName,email,password:hash})
            await user.save()
            res.send("Sign up Successful")
        })
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    try{
        if(!user){
            res.send("Please signup first")
        }
        const hash_pass=user?.password
        bcrypt.compare(password,hash_pass,async(req,result)=>{
            if(result){
                const token = jwt.sign({userID:user._id},"NORMAL_SECRET",{expiresIn:100})
                const ref_token = jwt.sign({userID:user._id},"REFRESH_SECRET",{expiresIn:200})
                res.send({"Msg":"Login Successful",token,ref_token})
            }else{
                res.send("Login failed")
            }
            
        })
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})

module.exports={
    userRouter
}