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

module.exports = router;