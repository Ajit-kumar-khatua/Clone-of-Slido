
let ham= document.querySelector(".ham");
let menu= document.querySelector("#complete");


ham.addEventListener("click",showmenu);
let tog=false;

function showmenu(){
    tog=!tog;
    tog?menu.style.display = "flex":menu.style.display = "none";


// console.log(1)
}




let codeBtn=document.getElementById("code-btn")

codeBtn.addEventListener("click",()=>{
    let code= document.getElementById("code").value;
    localStorage.setItem("roomno",JSON.stringify(+code))
    window.location.href="./polls.html"
})