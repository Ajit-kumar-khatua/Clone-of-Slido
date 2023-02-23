const jwt = require("jsonwebtoken")

const fs=require("fs")

const authenticate=(req,res)=>{
    const token =req.headers.authorization?.split(" ")[1]

    if(!token){
        res.send("Login again")
    }

    const blacklistdata=JSON.parse(fs.readFileSync("../blacklist.json","utf-8"))

    if(blacklistdata.includes(token)){
        return res.send("Login again")
    }

    jwt.verify(token,"NORMAL_SECRET",(err,decoded)=>{
        if(err){
            res.send({"msg":"Please Login first","err":err.message})

        }else{
            nextTick()
        }
    })
}

module.exports={
    authenticate
}