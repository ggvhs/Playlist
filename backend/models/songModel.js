const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a Artist Name'],
        },
    },
    {
        timestamps:true,
    }
)


module.exports = mongoose.model('Goal', songSchema)