var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
const {v4 : uuidv4}=require("uuid")
const {UserModel}=require("../models/user.model")

passport.use(new GoogleStrategy({
    clientID: "667252061579-1pcaoqgct55ijrf950255p1q019rh4ci.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
   let email=profile._json.email
   const user = new UserModel({
    email,
    password:uuidv4()
   })
   await user.save()
  
    return cb(null, user);
  }
));


module.exports={
  passport
}