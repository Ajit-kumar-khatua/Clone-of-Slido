var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "667252061579-1pcaoqgct55ijrf950255p1q019rh4ci.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:9000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let email = profile._json.email;
      let name = profile._json.name;
      let payload = {
        username: name,
        token: accessToken,
      };
      let x = await UserModel.findOne({ email });
      if (x) {
        return cb(null, payload);
      }

      const user = new UserModel({
        name,
        email,
        password: uuidv4(),
      });
      await user.save();
    
      return cb(null, payload);
    }
  )
);

module.exports = {
  passport,
};
