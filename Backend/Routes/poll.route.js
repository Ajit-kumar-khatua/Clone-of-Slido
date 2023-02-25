const express=require("express")
const { PollsModel } = require("../models/poll.model")
const { ResponseModel } = require("../models/response.model")

const pollRouter=express.Router()

pollRouter.get("/:code",async (req,res)=>{
    let code=req.params.code
    try {
        let poll=await PollsModel.find({code})
        res.json(poll)
        
    } catch (error) {
        console.log(error)
    }
})

pollRouter.get("/response/:code",async (req,res)=>{
    let code=req.params.code
    try {
        let data=await ResponseModel.find({code})
        res.json(data)
    } catch (error) {
        console.log(error)
    }
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

pollRouter.post("/response/add",async (req,res)=>{
    let payload=req.body
   try {
      let pollResponse=new ResponseModel(payload)
      await pollResponse.save()
      res.json("Response Added")
    
   } catch (error) {
       console.log(error)
   }
})


module.exports={
    pollRouter
}