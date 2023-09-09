const express = require('express')
const router = express.Router()
const {getSongs , setSong , updateSong, deleteSong} = require('../controllers/songController')

router.route('/').get(getSongs).post(setSong)
router.route('/:id').delete(deleteSong).put(updateSong)

router.put('/:id', updateSong)

router.delete('/:id', deleteSong)


module.exports = router