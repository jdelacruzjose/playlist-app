const User           = require('../models/user.model');
const LocalStrategy  = require('passport-local').Strategy;
const bcrypt         = require('bcrypt');
const passport       = require('passport');

passport.serializeUser((userLoggedIn, next) => {
    next(null, userLoggedIn._id);
});

passport.deserializeUser((userFromSession, next) => {
    User.findById(userFromSession, (err, userDocument) =>{
        if(err){
            next(err);
            return;
        }
        next(null, userDocument);
    });
});

passport.use(
    new LocalStrategy({
        usernameInput: 'username',
        passwordInput: 'password'
    }, (username, password, done) => {
       User.findById({ username })
        .then(foundUser => {
            if(!foundUser) {
                done(null, false, { message: 'Incorrect User' });
                return;
            }
            if(!bcrypt.compareSync(password, foundUser.password)){
                done(null, false, { message: 'Incorrect password '});
                return;
            }
            done(null, foundUser);
        }) 
        .catch(err => done(err));
        }
    )
);