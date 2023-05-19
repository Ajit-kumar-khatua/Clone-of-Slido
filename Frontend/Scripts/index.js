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

async function getpoll(code) {
    try {
      let res = await fetch(`${baseUrl}/polls/${code}`, {
        method: "GET",
      });
      let data = await res.json();
      if(data.length!=0){
        localStorage.setItem("roomno",JSON.stringify(+code))
        window.location.href="./polls.html"
      }else{
        alert("Invalid Input")
      }
        
    } catch (error) {
      console.log(error);
    }
  }
  




let codeBtn=document.getElementById("code-btn")

codeBtn.addEventListener("click",()=>{
    let code= document.getElementById("code").value;
    if(code==""){
        alert("Invalid Input")
        return
    }else{
      getpoll(code)
      
    }
    
})