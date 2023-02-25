document.querySelector("#sub").addEventListener("click",login)
document.querySelector(".but2").addEventListener("click",oauth)

async function oauth(event){
    event.preventDefault()
        window.location=("./auth/google")
       
}
let reg_data={}
async function login(event){
    event.preventDefault()
    try{
      
       
        let email=document.querySelector("#email").value
        let password=document.querySelector("#password").value
        // if(email=="user@admin" && password=="admin"){
        //     window.location="admin.html";
        //     return
        // }

        if(email==""  || password==""){
            alert("Fill the details correctly")
            return
        }

        reg_data={email,password}
        reg_data=JSON.stringify(reg_data)


        

        let regURL="http://localhost:9000/user/login"

        let response= await fetch(regURL,{
            method:"POST",
            body:reg_data,
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        let data=await response.json()
       
            window.location=("events.html")
            alert("Login Successful")
            console.log("Loged In")
            console.log(data)
        
     

    }catch(err){
        console.log(err)
    }

     
}