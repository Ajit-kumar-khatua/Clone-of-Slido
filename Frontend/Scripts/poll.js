
// const urlParams= new URLSearchParams(window.location.search)
// const room= urlParams.get("room")

let room=localStorage.getItem("roomno")

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