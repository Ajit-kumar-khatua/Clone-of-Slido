let baseUrl = "https://polleasy.onrender.com";

let ham= document.querySelector(".ham");
let menu= document.querySelector("#complete");


ham.addEventListener("click",showmenu);
let tog=false;

function showmenu(){
    tog=!tog;
    tog?menu.style.display = "flex":menu.style.display = "none";


// console.log(1)
}

async function getpoll() {
    try {
      let res = await fetch(`${baseUrl}/polls`, {
        method: "GET",
      });
      let data = await res.json();
      // let store=data[0].polls
     
      console.log(data[0].polls);
    } catch (error) {
      console.log(error);
    }
  }
  getpoll();




let codeBtn=document.getElementById("code-btn")

codeBtn.addEventListener("click",()=>{
    let code= document.getElementById("code").value;
    if(code==""){
        alert("Invalid Input")
        return
    }
    localStorage.setItem("roomno",JSON.stringify(+code))
    window.location.href="./polls.html"
})