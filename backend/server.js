require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const cookieParser = require("cookie-parser");
const passport     = require('passport');
const session      = require('express-session');

const app  = express();
const port = process.env.PORT || 5000;

 
require('./configs/passport')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    }));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}));

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




