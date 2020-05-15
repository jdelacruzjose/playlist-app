require('dotenv').config();

const express        = require('express');
const cors           = require('cors');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const cookieParser   = require("cookie-parser");
const passport       = require('passport');
const session        = require('express-session');
const flash          = require('express-flash');
const User           = require('./models/user.model');
const LocalStrategy  = require('passport-local').Strategy;
const bcrypt         = require('bcrypt');
// const logger         = require('morgan');

const app  = express();
const port = process.env.PORT || 5000;


// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./configs/passport')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) =>{
        if(err) {return cb(err); }
        cb(null, user);
    });
});

passport.use(new LocalStrategy((username, password, next)=>{
    User.findOne({ username }, (err, user) => {
        if(err){
            return next (err);
        }
        if(!user){
            return next(null, false, {message: 'Incorrect Username '});
        }
        if(!bcrypt.compareSync(password, user.password)){
            return next(null, false, {message: 'Incorrect Password'});
        }

        return next(null, user);
    });
}));

app.use((req, res, next)=>{
    res.locals.theUser = req.user;
  
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
  
    next();
});

  
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () =>{
     console.log('MongoDB database connection established successfully');
})

const userRoutes = require('./routes/user-routes');
const playlistRoutes = require('./routes/playlist-routes');

app.use('/users', userRoutes);
app.use('/playlist', playlistRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




