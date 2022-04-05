var passport = require('passport')
require("dotenv").config();
const TwitterStrategy = require('passport-twitter').Strategy

const intitPassportTwitter = () => {
  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
      cb(null, profile)
    }
  ));
};

module.exports = intitPassportTwitter