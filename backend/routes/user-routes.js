const router = require('express').Router();
const User = require('../models/user.model');

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

    const newUser = new User({
        username,
        email,
        password, 
        firstName,
        lastName, 
        imgUrl,  
        age,  
        gender, 
        followers       
    });

    newUser.save()
    .then(()=> res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;