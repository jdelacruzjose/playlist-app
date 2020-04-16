const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const playlistSchema = new Schema({
    url: {type: String, required: true},
    playlistName: {type: String, required: true},
    description: {type: String}, 
    },
    {
        timestamps: true
    });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;