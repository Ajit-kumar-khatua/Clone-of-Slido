const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors");
const { eventRouter } = require("./Routes/event.route");
const { pollRouter } = require("./Routes/poll.route");
mongoose.set('strictQuery', false);

const socketio=require("socket.io")
const http=require("http")

const dbconection= mongoose.connect("mongodb+srv://ajitkhatua:ajitkhatua@cluster0.hdz1j2r.mongodb.net/easypoll?retryWrites=true&w=majority")

const app=express()
const server=http.createServer(app)
const io=socketio(server)

let users=[]

function userJoin(id,room){
    const user={id,room}
    users.push(user)
    console.log(users)
    return user
}

function getCurrentUser(id){
    return users.find(user=> user.room)
}

function userLeave(id){
    const index=users.findIndex(user=>user.id==id)
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

io.on("connection",(socket)=>{
    console.log("Client is Connected")
    socket.on("joinRoom",({room})=>{
        const user= userJoin(socket.id,room)
        console.log(user)

        socket.join(user.room)
    })
    
    // socket.on("msg",(msg)=>{
    //     const user=getCurrentUser(socket.id)

    //     io.to(user.room).emit("message","Ajit")
    // })

    socket.on("response",(msg)=>{
        const user=getCurrentUser(socket.id)

        io.to(user.room).emit("message",msg)
    })
    
    socket.on("disconnect",()=>{
        const user= userLeave(socket.id)
        console.log("Client Disconnected.")
    })
})



app.use(express.json())
app.use(cors())
app.use("/events",eventRouter)
app.use("/polls",pollRouter)

app.get("/",(req,res)=>{
    res.send("All Good")
})


server.listen(8080,async ()=>{
    try {
       await dbconection 
       console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 8080")
})