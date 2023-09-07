
const AWS = require('aws-sdk')
const dotenv = require('dotenv').config()
const express = require('express')
const multer = require('multer')

const { memoryStorage } = require('multer')
const storage = memoryStorage()
const upload = multer({storage})

const port = process.env.PORT || 3006
const accesskey = process.env.accesskey
const secretAccessKey = process.env

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: flase}))

// TODO:  GO BACK TO BRAD'S VID 15:17
// app.get('/api/songs', (req,res) =>{
//     res.json({message:'Get Songs'})
// })
//TODO: END OF TODO


//TODO: Implement code below using brads method
// create a bucket 
// route post
//data

const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: ''
})

//* The upload function
const uploadSong = () =>{

    const params ={
        Key: filename,
        Busket: bucketname,
        Body: file,
        ContentType: ';audio/mpeg',
        ACL: 'public-read'
    }


    s3.upload(params, (error,data)=>{
        if(error){
            return
        }else{
            return (data)
        }
    })
}

const bucket = 'music-uploads-for-playlist'

app.post('/upload' , (req,res) => {
    console.log('uploaded sucessfully ...')
})
//TODO: end of TODO

app.listen(port, () => console.log(`Server started on port ${port}`) )