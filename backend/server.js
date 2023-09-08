// * imports
const AWS = require('aws-sdk')
const dotenv = require('dotenv').config()
const express = require('express')
const multer = require('multer')


//* Specifying ports
const port = process.env.PORT || 3006


const app = express()
//? What is the significance of th express.json and express.url encoded
app.use(express.json())
app.use(express.urlencoded({extended: false }))


//* These are my routes for my mongoDB operations

app.use('/api/songs', require('./routes/songRoutes'))


//! rotues related to the MP3 file man
//TODO: Implement code below using brads method

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})


const upload = multer({ storage: multer.memoryStorage() });




//* The upload function
const uploadSong = (filename, bucketname, file) =>{

    return new Promise((resolve, reject) =>{
        const params ={
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
            
        }
    
        s3.upload(params, (error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve (data.Location)
            }
        })
    })


}

app.post('/upload' , upload.single('songfile'), async (req,res) => {
    const filename = '6th upload test';
    const bucketname = 'music-uploads-for-playlist';
    const file = req.file.buffer
    console.log('FILE' , file)
    const link = await uploadSong(filename, bucketname, file)
    console.log(link)
    res.send('uploaded successfully...')
})


//TODO: end of TODO

app.listen(port, () => console.log(`Server started on port ${port}`) )