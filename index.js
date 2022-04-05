const express = require("express")
const passport = require("passport")
const session = require("express-session")
const initPassportTwitter = require("./controller/passportTwitter")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const initPassportGoogle = require("./controller/passportGoogle")

require("dotenv").config();
const cors = require('cors')
const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology:true
}, () => {
    console.log("Connected to MongoDB")
})

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

initPassportGoogle()
initPassportTwitter()

// GOOGLE ENPOINTS
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }
));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
});

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

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});