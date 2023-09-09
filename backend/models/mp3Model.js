const mongoose = require('mongoose');

const mp3Schema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, 'Please add a filename'],
    },
    originalname: String,
    user_id: String, // User ID associated with the MP3 (if applicable).
   
  },
  {
    timestamps: true,
  }
);

const Mp3 = mongoose.model('Mp3', mp3Schema);

module.exports = Mp3;