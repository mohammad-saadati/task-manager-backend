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
      const user = User.findOne({ email: profile.emails[0].value }).then(
        (existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile ID
            callback(null, existingUser);
          } else {
            // we don't have a user record with this ID, make a new record!
            new User({
              username: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((user) => callback(null, user));
          }
        }
      );
    }
  )
);
passport.serializeUser((user, done) => {
  // done(null, user._id);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
  // User.findById(id).then((user) => {
  //   done(null, user);

  // });
});
