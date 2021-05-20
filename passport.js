const passport = require("passport");
const SlackStrategy = require("passport-slack-oauth2").Strategy;
const { clientId, clientSecret, callbackUrl } = require("./config");
passport.authenticate("Slack");
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new SlackStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      skipUserProfile: false,
      scope: [
        "identity.basic",
        "identity.email",
        "identity.avatar",
        "identity.team",
      ], // default
    },
    (accessToken, refreshToken, profile, done) => {
      //   console.log(profile);
      return done(null, profile);
    }
  )
);
