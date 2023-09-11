// * imports
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const express = require('express')




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
app.use('/api/users', require('./routes/userRoutes'))





//using error handler
app.use(errorHandler)

//Port listener
app.listen(port, () => console.log(`Server started on port ${port}`) )