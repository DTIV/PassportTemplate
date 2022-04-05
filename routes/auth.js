var passport = require('passport')
var express = require('express')

const router = express.Router();

router.get("/twitter", passport.authenticate("twitter", {scope: ['profile']}));

router.get("/twitter/callback",
  passport.authenticate("twitter", { 
    failureRedirect: "/login", 
    successRedirect: 'http://localhost:3000/'
  })
);

module.exports = router
