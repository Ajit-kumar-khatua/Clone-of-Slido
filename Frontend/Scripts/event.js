
let navbar= document.getElementById("navbar")
let url="http://localhost:8080/"
let allEvents=document.querySelector(".all-events")

function createnav(){
     navbar.innerHTML=
     `
     <div id="child1">
        <a href="#">Ajit Kumar Organisation</a>
     </div>
    <div id="child2">
        <input type="search" id="search" placeholder="Search Event">
        <a href="#">What's new</a>
        <button >AK</button>
    </div>
     `
}
createnav()

async function fetchEvent(){
  try {
    let res= await fetch(`${url}events`)
    let data= await res.json()
    console.log(data)
    displayEvents(data)
    
  } catch (error) {
     console.log(error)
  }
}
fetchEvent()


function displayEvents(data){
   allEvents.innerHTML=`
    ${data.map((elem)=>{
        return `
        <hr>
        <div class="all-polls">
            <button id="calender"><i class="fa-regular fa-calendar"></i></button>
            <div>
                <span id="name">${elem.name}</span>
                <span id="code">#${elem.code}</span>
                <p>${elem.start}</p>
            </div>
            <button class="event-delete"><i class="fa-solid fa-trash"></i></button>
        </div>
         <hr>
        `
    }).join("")}
   `
}