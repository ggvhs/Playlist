const asyncHandler = require('express-async-handler')

const Song = require('../models/songModel')


//@description  Get songs
//@route        Get /api/songs
//@access       Private
const getSongs = asyncHandler( async (req,res) => {
    const songs = await Song.find()
    res.status(200).json(songs)
})


//@description  Set songs
//@route        POST /api/songs
//@access       Private
const setSong = asyncHandler(async (req,res) => {
    if(!req.body.songName || !req.body.artistName){
        res.status(400)
        throw new Error('Please add a text field ')
    }

    const song = await Song.create({
        songName: req.body.songName,
        artistName: req.body.artistName
    }) 
    res.status(200).json(song)
})


//@description  Update songs
//@route        PUT /api/songs
//@access       Private
const updateSong = asyncHandler(async (req,res) => {
    const song = await Song.findById(req.params.id)

    if(!song) {
        res.status(400)
        throw new Error('Song not found')
    }

    const updataedGoal = await Song.findByIdAndUpdate(req.params.id,req.body,{new: true,})

    res.status(200).json(updataedGoal)
})


//@description  Delete songs
//@route        DELETE /api/songs/:id
//@access       Private
const deleteSong = asyncHandler(async (req,res) => {
    const song = await Song.findByIdAndRemove(req.params.id)

    if(!song) {
        res.status(400)
        throw new Error('Song not found')
    }

    

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getSongs,
    setSong,
    updateSong,
    deleteSong
}