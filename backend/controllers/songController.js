const asyncHandler = require('express-async-handler')

const Song = require('../models/songModel')
const User = require('../models/userModel')


//@description  Get songs
//@route        Get /api/songs
//@access       Private
const getSongs = asyncHandler( async (req,res) => {
    const songs = await Song.find({ user: req.user.id})
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
        artistName: req.body.artistName,
        user: req.user.id
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

    const user = await User.findById(req.user.id)

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error ('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(song.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updataedSong = await Song.findByIdAndUpdate(req.params.id,req.body,{new: true,})

    res.status(200).json(updataedSong)
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

    

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error ('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(song.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getSongs,
    setSong,
    updateSong,
    deleteSong
}