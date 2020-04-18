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

router.route('/:id').get((req, res)=>{
    Playlist.findById(req.params.id)
    .then(playlist => res.json(playlist))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) =>{
    Playlist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    Playlist.findById(req.params.id)
    .then(playlist => {
        playlist.url = req.body.url;
        playlist.playlistName = req.body.playlistName;
        playlist.description = req.body.description;

        playlist.save()
        .then(()=> res.json('Exercise updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;