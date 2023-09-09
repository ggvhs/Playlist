const asyncHandler = require('express-async-handler')

const Goal = require('../models/songModel')


//@description  Get songs
//@route        Get /api/songs
//@access       Private
const getSongs = asyncHandler( async (req,res) => {
    res.status(200).json({message:'Get Songs'})
})


//@description  Set songs
//@route        POST /api/songs
//@access       Private
const setSong = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field ')
    }
    res.status(200).json({message:'Set Songs'})
})


//@description  Update songs
//@route        PUT /api/songs
//@access       Private
const updateSong = asyncHandler(async (req,res) => {
    res.status(200).json({message:`update song ${req.params.id}`})
})


//@description  Delete songs
//@route        DELETE /api/songs/:id
//@access       Private
const deleteSong = asyncHandler(async (req,res) => {
    res.status(200).json({message: `delete song ${req.params.id}`})
})

module.exports = {
    getSongs,
    setSong,
    updateSong,
    deleteSong
}