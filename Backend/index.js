const express = require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Routes/user.router")
const {passport}=require("./Config/google-oauth")



const app=express()

app.use("/user",userRouter)


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });

app.get("/",(req,res)=>{
    res.send("Welcome")
})




app.listen(9000,async()=>{
    try{
        await connection
        console.log("The server is connected to DB")
    }catch(err){
        console.log(err)
        console.log({'Msg':"Something went wrong"})
    }
    console.log("The server is listning at port 9000")
})

