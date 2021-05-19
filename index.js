const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passport");

app.use(
  cookieSession({
    name: "amazon-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send(`Hello world ${req.user.displayName}@${req.user.id}`);
});
app.get("/auth/error", (req, res) => res.send("Unknown Error"));
app.get("/auth/slack", passport.authenticate("slack", { scope: ["profile"] }));
app.get(
  "/auth/slack/callback",
  passport.authenticate("Slack", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.redirect("/");
  }
);
app.listen(8000, () => {
  console.log("Serve is up and running at  http://localhost:8000");
});
