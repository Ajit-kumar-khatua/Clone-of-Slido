
// const urlParams= new URLSearchParams(window.location.search)
// const room= urlParams.get("room")

let room=localStorage.getItem("roomno")
let baseUrl="https://polleasy.onrender.com"
let token= localStorage.getItem("token")

let responseForm=document.getElementById("response-form")






const socket = io("https://polleasy.onrender.com/" , {transports : ["websocket"]})

socket.emit("joinRoom",{room})

socket.emit("msg","Ajit")

socket.on("message",(msg)=>{
    console.log(msg)
})

responseForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    let res=document.getElementById("res").value;
    socket.emit("response",res)
})

async function getpoll(){
    try {
        let res=await fetch(`${baseUrl}/polls/${room}`,{
            method: "GET"
        })
        let data=await res.json()
        console.log(data[0].polls)
        
    } catch (error) {
        console.log(error)
    }
}
getpoll()