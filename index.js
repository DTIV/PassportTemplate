const express = require("express")
const passport = require("passport")
const session = require("express-session")
const initPassportTwitter = require("./controller/passportTwitter")
const bodyParser = require("body-parser")

require("dotenv").config();
const cors = require('cors')
const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)
app.use(
    session({ 
        secret: process.env.SESSION_SECRET, 
        resave: true, 
        saveUninitialized: true 
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initalising passport twitter
app.use(passport.initialize());
app.use(passport.session());

// SERIALIZE AND DESERIALIZE
passport.serializeUser((user, done) =>{
    return done(null, user)
})

passport.deserializeUser((user,done) => {
    return done(null, user)
})

// INITIALIZE TWITTER
initPassportTwitter()

// TWITTER ENDPOINTS
app.get("/auth/twitter",
    passport.authenticate("twitter", {scope: ['profile']}
));

app.get("/auth/twitter/callback",
    passport.authenticate("twitter", { 
        failureRedirect: "/login", 
        successRedirect: 'http://localhost:3000/'
    })
);

// SERVER
app.get("/", (req, res)=>{
    res.send("welcome to homepage")
})

app.get('/getuser', (req,res) => {
    res.send(req.user)
})

app.get("/auth/logout", (req,res) => {
    if(req.user){
        req.logout();
        res.send("logout success!")
    }
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});