// const User           = require('../models/user.model');
// const LocalStrategy  = require('passport-local').Strategy;
// const bcrypt         = require('bcrypt');
// const passport       = require('passport');

// passport.serializeUser((user, cb) => {
//     cb(null, user._id);
// });

// passport.deserializeUser((id, cb) => {
//     User.findById(id, (err, user) =>{
//         if(err) {return cb(err); }
//         cb(null, user);
//     });
// });

// passport.use(new LocalStrategy((username, password, next)=>{
//     User.findOne({ username }, (err, user) => {
//         if(err){
//             return next (err);
//         }
//         if(!user){
//             return next(null, false, {message: 'Incorrect Username '});
//         }
//         if(!bcrypt.compareSync(password, user.password)){
//             return next(null, false, {message: 'Incorrect Password'});
//         }

//         return next(null, user);
//     });
// }));

 