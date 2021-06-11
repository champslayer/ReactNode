const passport = require('passport');

module.exports = app =>{
    app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
    //used to get to site where use have to login in their id 

    app.get('/auth/google/callback',passport.authenticate('google'));
    //used to call after the authentication is been done

    app.get('./api/logout',(req,res)=>{
        req.logout();
        req.send(req.user);
    });

    app.get('./api/cuser',(req,res)=>{
        res.send(req.user); 
    });
}
