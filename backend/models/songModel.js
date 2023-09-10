const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
    {
        songName: {
            type: String,
            required: [true, 'Please add a Song Name'],
        },
        artistName: {
            type:String,
            required: [true, 'Please add an Artist Name']
        }
    },
    {
        timestamps:true,
    }
)


module.exports = mongoose.model('Song', songSchema)