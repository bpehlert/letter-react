const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id); //null is the error
});

// Pulls userId from the cookie
passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      proxy: true
    },
    //  Callback function to save user to DB
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        name: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        },
        email: profile.emails[0].value,
        photoURL: profile.photos[0].value
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    User.findOne({ username })
      .then(user => {
        if (!user || !user.isCorrectPassword(password)) {
          done(null, false, { message: "Incorrect email or password." });
        } else {
          done(null, user);
        }
      })
      .catch(e => done(e));
  })
);

// For JWT authentication (email auth)

// let opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.tokenKey;
// passport.use(
//   new JwtStrategy(opts, function(jwt_payload, done) {
//     console.log(jwt_payload);
//     User.findOne({ id: jwt_payload.sub }, function(err, user) {
//       if (err) {
//         return done("Hello", false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         // or you could create a new account
//         console.log(user);
//         return done(null, false);
//       }
//     });
//   })
// );
