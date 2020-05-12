const express      = require('express');
const cors         = require('cors');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const cookieParser = require("cookie-parser");
const passport     = require('passport');
const flash        = require('express-flash');
const session      = require('express-session');
// const favicon      = require('serve-favicon');


require('dotenv').config();

const app  = express();
const port = process.env.PORT || 5000;

const initializePassport = require('./configs/passport')
initializePassport(
    passport,
    email => users.find(user => user.email === email)
    id => users.find(user => user.id === id)
)

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

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
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




