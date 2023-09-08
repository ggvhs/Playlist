
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });





router.get('/', (req, res) => {
    res.send('Test route for MP3 uploads');
  });

module.exports = router