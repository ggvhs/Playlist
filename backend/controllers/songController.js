//@description  Get songs
//@route        Get /api/songs
//@access       Private
const getSongs = (req,res) => {
    res.status(200).json({message:'Get Songs'})
}


//@description  Set songs
//@route        POST /api/songs
//@access       Private
const setSong = (req,res) => {
    res.status(200).json({message:'Set Songs'})
}


//@description  Update songs
//@route        PUT /api/songs
//@access       Private
const updateSong = (req,res) => {
    res.status(200).json({message:`update song ${req.params.id}`})
}


//@description  Delete songs
//@route        DELETE /api/songs/:id
//@access       Private
const deleteSong = (req,res) => {
    res.status(200).json({message: `delete song ${req.params.id}`})
}

module.exports = {
    getSongs,
    setSong,
    updateSong,
    deleteSong
}