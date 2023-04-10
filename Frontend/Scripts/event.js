
 let startday=document.querySelector("#start-date");
let endday= document.querySelector("#end-date");
console.log(endday);

startday.addEventListener("input",()=>{

  let val=startday.value;
  // console.log(val);
  
 
if(val!==undefined){
  endday.setAttribute("min",val)

}else{
  endday.setAttribute("min",null);
}
})






let navbar= document.getElementById("navbar")
let baseUrl="https://polleasy.onrender.com"
let allEvents=document.querySelector(".all-events")
let token=localStorage.getItem("token")
let firstName=localStorage.getItem("firstName")
let lastName=localStorage.getItem("lastName")


function createnav(){
     navbar.innerHTML=
     `
     <div id="child1">
        <a href="#">${firstName}'s Organisation</a>
     </div>
    <div id="child2">
        <input type="search" id="search" placeholder="Search Event">
        <a href="#">What's new</a>
        <button >${firstName[0]+lastName[0]}</button>
        <a href="./index.html" id="logout">Logout</a>
    </div>
     `

     let logout=document.getElementById("logout")
     logout.addEventListener("click",()=>{
         localStorage.clear()
     })
}
createnav()

async function fetchEvent(){
  try {
    let res= await fetch(`${baseUrl}/events`,{
      method:"GET",
      headers:{
        Authorization: token
      }
    })
    let data= await res.json()
    console.log(data)
    displayEvents(data)
    searchEvents(data)
    
  } catch (error) {
     console.log(error)
  }
}
fetchEvent()


function displayEvents(data){
   allEvents.innerHTML=`
    ${data.map((elem)=>{
        return `
        <div class="all-polls" >
            <button id="calender"><i class="fa-regular fa-calendar"></i></button>
            <div id="all" class=${elem._id}>
                <span id="name">${elem.name}</span>
                <span id="code">#${elem.code}</span>
                <p> <b>Start Date:- </b> ${elem.startdate}</p>
                <p> <b>End Date:- </b> ${elem.enddate}</p>
            </div>
            <button class="event-delete" data-id=${elem._id}>Delete</button>
        </div>
        <hr>
        `
      
    }).join("")}
   `
  //  
   let evnetDeleteBtns= document.querySelectorAll(".event-delete")
   for(let deleteBtn of evnetDeleteBtns){
      deleteBtn.addEventListener("click",(event)=>{
          deleteEvent(event.target.dataset.id)
      })
   }
 
   let polls=document.querySelectorAll("#all")
   
   for(let poll of polls){
       poll.addEventListener("click",(e)=>{
            let id=poll.getAttribute('class')
            getpoll(id)
       })
   }

}

async function getpoll(id){
    try {
      let res= await fetch(`${baseUrl}/events/${id}`)
      let data= await res.json()
      console.log(data)
      localStorage.setItem("polldata",JSON.stringify(data))
      window.location.href="./adminpoll.html"
      
    } catch (error) {
        console.log(error)
    }
}

async function deleteEvent(id){
    try {
      let res= await fetch(`${baseUrl}/events/delete/${id}`,{
        method:"DELETE",
      })
      let data=await res.json()
      alert(data.msg)
      fetchEvent()
      
    } catch (error) {
        console.log(error)
    }
}

let createPollBtn= document.getElementById("create-poll")
let cancelBtn=document.getElementById("cancel")
let body=document.querySelector("body")
let pollBox=document.getElementById("crete-pollbox")

createPollBtn.addEventListener("click",()=>{
 
    pollBox.style.display="block"
    body.style.opacity="1"
    pollBox.style.opacity="1"
})

cancelBtn.addEventListener("click",()=>{
  pollBox.style.display="none"
  body.style.opacity="1.0"
})



let pollBtn=document.getElementById("submit")

pollBtn.addEventListener("click", ()=>{
  let startdate=document.getElementById("start-date").value;
  let enddate=document.getElementById("end-date").value
  let name=document.getElementById("poll-name").value
    let obj={
       startdate:startdate,enddate:enddate,name:name
    }
    console.log(obj)
    addPoll(obj)

})


async function addPoll(obj){
  try {
    let res=await fetch(`${baseUrl}/events/add`,{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        "Content-Type":"Application/json",
        Authorization: token
      }
    })
    let data=await res.json()
    alert("Event Created")
    pollBox.style.display="none"
    fetchEvent()
    body.style.opacity="1"
    
  } catch (error) {
      console.log(error)
  }
}


function searchEvents(data){
  let searchData=document.getElementById("search")
   searchData.addEventListener("input",()=>{
      let searchedData=data.filter((elem)=>{
         return elem.name.toLowerCase().includes(searchData.value.toLowerCase())
      })
      displayEvents(searchedData)
   })
}


