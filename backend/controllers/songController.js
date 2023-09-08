const getSongs = (req,res) => {
    res.status(200).json({message:'Get Songs'})
}

module.exports = {
    getSongs
}