const router = require('express').Router();
const Playlist = require('../models/playlist');

router.route('/').get((req, res) =>{
    Playlist.find()
    .then(playlists => res.json(playlists))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) =>{
    const url = req.body.url;
    const playlistName = req.body.playlistName;
    const description = req.body.description;

    const newPlaylist = new Playlist({
        url,
        playlistName,
        description,             
    });

    newPlaylist.save()
    .then(()=> res.json('Playlist Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;