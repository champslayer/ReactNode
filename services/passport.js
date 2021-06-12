const passport = require('passport'); //passport required for google authentication using cookies 
const GoogleStrategy = require('passport-google-oauth20').Strategy;;
const cookieSession = require('cookie-session'); // give acess to cookies 
const mongoose = require('mongoose');
const keys = require('../config/keys')

const User = mongoose.model('users');
// User - modle class (relation to underline collection under mongodb)



//encoding user id to cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);//user id refrence to specific id a person has
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user.id);
    })
});
//till here encoding


passport.use(
     new GoogleStrategy({
             clientID: keys.googleClientID,
             clientSecret: keys.googleClientSecret,
             callbackURL: '/auth/google/callback', // site used for call back after loging in
             Proxy:true
         },
         (accessToken,refreshToken,profile,done) => {
             User.findOne({googleID:profile.id}).then((existingUser)=>{// finding the user is present or not
                 if(existingUser){
                 // profile aready present
                     done(null,existingUser);
                 }
                 else{
                     //making new profile
                     new User({ googleID : profile.id}).save() // create database in js and alocating profile id as google id
                     .then(user =>done(user,null));
                 }                       
             }) 
         }
     )
 );