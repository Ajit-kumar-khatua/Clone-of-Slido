let navbar= document.getElementById("navbar")
let pollData=JSON.parse(localStorage.getItem("polldata"))
let baseUrl="http://localhost:8080"

function createnav(){
    navbar.innerHTML=
    `
    <div id="child1">
       <a href="#">${pollData.name}</a>
    </div>
    <div id="child3">
       <a href="#"># ${pollData.code}</a>
    </div>
   <div id="child2">
       <a href="#">What's new</a>
       <button >AK</button>
   </div>
    `
}
createnav()

let launchBtn=document.getElementById("launch")

launchBtn.addEventListener("click",async ()=>{
     let input=document.getElementById("open-text").value;
     let code=pollData.code
     try {
        let obj={polls:input,code}
        let res=await fetch(`${baseUrl}/polls/add`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json()
        console.log(data)
        
     } catch (error) {
        console.log(error)
     }
})