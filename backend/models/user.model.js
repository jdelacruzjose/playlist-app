const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true, minlength: 3, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    imgUrl: {type: String},
    age: Number,
    gender: String,
    followers: [{ type: Schema.Types.ObjectId, ref:'User'}],
    },
    {
        timestamps: true
    });

const User = mongoose.model('User', userSchema);
module.exports = User;