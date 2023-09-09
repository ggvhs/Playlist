// * imports
const AWS = require('aws-sdk')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const express = require('express')
const multer = require('multer')
const uploadSong = require('./aws')


//* Calling the function the connects the db
connectDB()


//* Specifying ports
const port = process.env.PORT || 3006


const app = express()
//? What is the significance of th express.json and express.url encoded
app.use(express.json())
app.use(express.urlencoded({extended: false }))



//* These are my routes for my mongoDB operations
app.use('/api/songs', require('./routes/songRoutes'))


//* POST / DELETE route for aws operations
const upload = multer({ storage: multer.memoryStorage() });


app.post('/upload' , upload.single('songfile'), async (req,res) => {
    const filename = '6th upload test';
    const bucketname = 'music-uploads-for-playlist';
    const file = req.file.buffer
    console.log('FILE' , file)
    const link = await uploadSong(filename, bucketname, file)
    console.log(link)
    res.send('uploaded successfully...')
})




//using error handler
app.use(errorHandler)

//Port listener
app.listen(port, () => console.log(`Server started on port ${port}`) )