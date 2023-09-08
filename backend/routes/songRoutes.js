const express = require('express')
const router = express.Router()
const {getSongs} = require('../controllers/songController')

router.get('/', getSongs)

router.post('/', (req,res) =>{
    res.status(200).json({message:'Set Songs'})
})
router.put('/:id', (req,res) =>{
    res.status(200).json({message:`update goal ${req.params.id}`})
})
router.delete('/:id', (req,res) =>{
    res.status(200).json({message:`delete goal ${req.params.id}`})
})

module.exports = router