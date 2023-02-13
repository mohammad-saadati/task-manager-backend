var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      // User.findOne({ googleId: profile.id }).then((existingUser) => {
      //   if (existingUser) {
      //     // we already have a record with the given profile ID
      //     done(null, existingUser);
      //   } else {
      //     // we don't have a user record with this ID, make a new record!
      //     new User({ googleId: profile.id })
      //       .save()
      //       .then((user) => done(null, user));
      //   }
      // });

      console.log(profile);
      callback(null, profile);
    }
  )
);
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
