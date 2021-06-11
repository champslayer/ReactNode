const mongoose = require('mongoose');
const { Schema }= mongoose; //declaring in module as schema a const 

const userSchema = new Schema({
    googleID : String //making google id for diffrentiating profiles 
});

mongoose.model('users',userSchema);