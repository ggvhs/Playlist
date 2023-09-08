// * imports
const AWS = require('aws-sdk')
const dotenv = require('dotenv').config()
const express = require('express')
const multer = require('multer')


//* Specifying ports
const port = process.env.PORT || 3006


//* Saving my access keys
const accesskey = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const app = express()
//? What is the significance of th express.json and express.url encoded
app.use(express.json())
app.use(express.urlencoded({extended: false }))


//* These are my routes for my mongoDB operations

app.get('/api/songs', (req,res) =>{
    res.status(200).json({message:'Get Songs'})
})



//! rotues related to the MP3 file man
//TODO: Implement code below using brads method
// create a bucket 
// route post
//data

const s3 = new AWS.S3({
    accessKeyId: `${accesskey}`,
    secretAccessKey: `${secretAccessKey}`
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
    const filename = '4th upload';
    const bucketname = 'music-uploads-for-playlist';
    const file = req.file.buffer
    console.log('FILE' , file)
    const link = await uploadSong(filename, bucketname, file)
    console.log(link)
    res.send('uploaded successfully...')
})
//TODO: end of TODO

app.listen(port, () => console.log(`Server started on port ${port}`) )