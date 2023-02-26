document.querySelector("#button").addEventListener("click",register)
document.querySelector(".but2").addEventListener("click",oauth)

async function oauth(event){
    event.preventDefault()
        window.location=("http://localhost:9000/auth/google")
       
}
let reg_data={}
async function register(event){
    event.preventDefault()
    try{
        let firstName=document.querySelector("#fname").value
        let lastName=document.querySelector("#lname").value
        let email=document.querySelector("#email").value
        let password=document.querySelector("#password").value
        
        if(email=="" || firstName==""|| lastName=="" || password==""){
            alert("Fill the details correctly")
            return
        }

        reg_data={firstName,lastName,email,password}

        reg_data=JSON.stringify(reg_data)

        

            let regURL="https://polleasy.onrender.com/users/signup"

        let response= await fetch(regURL,{
            method:"POST",
            body:reg_data,
            headers:{
                "Content-Type":"application/json"
            }
        })

        let data=await response.json()
            alert(data.msg)
            window.location=("signin.html")
    }catch(err){
        console.log(err)
    }
}