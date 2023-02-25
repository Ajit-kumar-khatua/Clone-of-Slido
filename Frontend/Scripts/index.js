


let codeBtn=document.getElementById("code-btn")

codeBtn.addEventListener("click",()=>{
    let code= document.getElementById("code").value;
    localStorage.setItem("roomno",JSON.stringify(+code))
    window.location.href="./polls.html"
})