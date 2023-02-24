const express=require("express")
const { PollsModel } = require("../models/poll.model")

const pollRouter=express.Router()

pollRouter.get("/",(req,res)=>{
    res.send("All Good!!")
})

pollRouter.post("/add",async (req,res)=>{
    let payload=req.body
   try {
      let poll=new PollsModel(payload)
      await poll.save()
      res.json("Poll Created")
    
   } catch (error) {
       console.log(error)
   }
})

module.exports={
    pollRouter
}