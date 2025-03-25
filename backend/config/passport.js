const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // In a real app, you'd save/find the user in the database here.
      // For this demo, we attach the accessToken to the profile.
      profile.accessToken = accessToken;
      return done(null, profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
