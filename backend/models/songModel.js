const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
    {   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
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