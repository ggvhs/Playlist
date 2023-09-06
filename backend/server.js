console.log('Hello World')

const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3006

const app = express()

app.get('/api/songs', (req,res) =>{
    res.send('Get Songs')
})

app.listen(port, () => console.log(`Server started on port ${port}`) )