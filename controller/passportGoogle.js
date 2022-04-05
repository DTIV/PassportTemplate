const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();
const passport = require("passport")

const intitPassportGoogle = () => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(profile)
            cb(null, profile)
        }
    ));
}

module.exports = intitPassportGoogle