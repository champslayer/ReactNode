const express = require('express');

const mongoose = require('mongoose');            //for using mongoose
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./models/user');                        //insialsise mongoose for creating new users

require('./services/passport');                  //using passport to grab data of user's login account  

mongoose.connect(keys.mongoURI);

const app = express();
app.use(cookieSession({
        maxAge : 30*24*60*60*1000,
        keys : [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authroute')(app);              // use of passport to ask google for authentication


const PORT = process.env.PORT || 5000;           //making app to listen to port 5000 or link provided
app.listen(PORT);
