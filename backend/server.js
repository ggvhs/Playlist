// * imports
const AWS = require('aws-sdk')
const s3 = new AWS.S3();
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const express = require('express')
const multer = require('multer')
const uploadSong = require('./aws')
const Mp3 = require('./models/mp3Model')
const { restart } = require('nodemon')


//* Calling the function the connects the db
connectDB()


//* Specifying ports
const port = process.env.PORT || 3006


const app = express()
//? What is the significance of th express.json and express.url encoded
app.use(express.json())
app.use(express.urlencoded({extended: false }))


// Configure AWS SDK using environment variables
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });



//* These are my routes for my mongoDB operations
app.use('/api/songs', require('./routes/songRoutes'))


//* POST route for aws operations
const upload = multer({ storage: multer.memoryStorage() });


app.post('/upload' , upload.single('songfile'), async (req,res) => {
    try{
        //Handle mp3 file upload logic here
        const filename = '7th upload test';
        const bucketname = 'music-uploads-for-playlist';
        const file = req.file.buffer
        console.log('FILE' , file)

        // Create a new MP3 document and save the binary data along with metadata
        const mp3 = new Mp3({
            filename,
            originalname: req.file.originalname,
            user_id: req.file.user_id
        });

        await mp3.save();

        //upload to my bucket
        const link = await uploadSong(filename, bucketname, file)
        console.log(link)

        res.send('uploaded successfully... and metadata saved.')
    } catch(error){
        console.error('Error uploading MP3 file:', error);
        res.status(500).send('Error uploading MP3 file.')
    }
    
 
})

app.get('/list' , async (req, res) => {
    try{
        //Query the MongoDB database to retrive a list of MP3 files
        const mp3List = await Mp3.find();


        //send the list in json
        res.json(mp3List);
    } catch (error){
        console.error('Error retrieving MP3 list:', error);
        res.status(500).send('Error retrieving MP3 list.')
    }
})


app.delete('/mp3/:id', async (req,res) => {
    try {
        const mp3Id = req.params.id;

        // Find the MP3 document by its ObjectId
        const mp3 = await Mp3.findById(mp3Id)

        if (!mp3) {
            return res.status(404).send('MP3 file not found.');
          }

        const deleteParams = {
            Bucket: 'music-uploads-for-playlist',
            Key: mp3.filename,
          };

        await s3.deleteObject(deleteParams).promise();

        // Remove the MP3 document from MongoDB using deleteOne
        await Mp3.deleteOne({ _id: mp3Id })

        res.send('MP3 file deleted sucessfully.')
    } catch (error) {
        console.error('Error deleting MP3 file:', error);
        res.status(500).send('Error deleting MP3 file.');
        
    }
})


//using error handler
app.use(errorHandler)

//Port listener
app.listen(port, () => console.log(`Server started on port ${port}`) )