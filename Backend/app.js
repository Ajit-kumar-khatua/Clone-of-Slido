const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors");
const { eventRouter } = require("./Routes/event.route");
const { pollRouter } = require("./Routes/poll.route");
mongoose.set('strictQuery', false);

const conection= mongoose.connect("mongodb+srv://ajitkhatua:ajitkhatua@cluster0.hdz1j2r.mongodb.net/easypoll?retryWrites=true&w=majority")

const app=express()
app.use(express.json())
app.use(cors())
app.use("/events",eventRouter)
app.use("/polls",pollRouter)

app.get("/",(req,res)=>{
    res.send("All Good")
})


app.listen(8080,async ()=>{
    try {
       await conection 
       console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 8080")
})