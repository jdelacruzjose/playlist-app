const router    = require('express').Router();
const User      = require('../models/user.model');
const passport  = require('passport');
const bcrypt    = require('bcrypt');

router.route('/').get((req, res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const imgUrl = req.body.imgUrl;
    const age = req.body.age;
    const gender = req.body.gender;
    const followers = req.body.followers;

    if(!username || !password){
        res.status(400).json({ message: 'Provide username and password'});
        return;
    }

    if(password.length < 3){
        res.json(400).json({
            message: 'Please be sure your password is at least 3 characters long'});
        return;
    }

    User.findOne({ username }, (err, foundUser) => {
        if(err){
            res.status(500).json({ message: 'Username not found.'});
            return;
        }
        if(foundUser){
            res.status(400).json({ message: 'Username taken. Choose another one'});
            return;
        }
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
        username: username,
        email: email,
        password: hashPass, 
        firstName: firstName,
        lastName: lastName, 
        imgUrl: imgUrl,  
        age: age,  
        gender: gender, 
        followers: followers       
    });

    newUser.save()
    .then(()=> res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err))
});

router.route('/:id').delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted'))
    .catch(err => res.status(400).json('Error '+ err));
});

router.route('/update/:id').post((req, res) =>{
    User.findByIdAndUpdate(req.params.id)
    .then(user =>{
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.imgUrl = req.body.imgUrl;
        user.age = req.body.age;
        user.gender = req.body.gender;
        user.followers = req.body.followers;

        user.save()
        .then(()=> res.json('User updated'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

//---------- Login ----------- 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
        console.log('Got User!');
    })(req, res, next);
});

//---------- LogOut ----------- 
router.post('/logout',(req, res, next) => {
    req.logOut();
    res.status(200).json({ message: 'Logged out Success' });
});

//---------- LoggedIn ----------- 
router.get('/loggedIn',(req, res, next) => {
  if(req.isAuthenticated()){
      res.status(200).json(req.user);
      return;
  }  
  res.status(403).json({ message: 'Unauthorized'});
});

module.exports = router;