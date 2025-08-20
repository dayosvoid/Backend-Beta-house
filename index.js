require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const errorHandlerMiddleware = require('./middleware/errorHandler.middleware')
const userRouter = require('./route/user.route')
const propertyRouter = require('./route/property.route')
const PORT = process.env.PORT || 4000



app.use(express.json())

app.use('/user', userRouter)
app.use('/',propertyRouter)


app.use( (req, res) => { 
  res.status(404).json({ message: 'page not found' }); 
});
app.use(errorHandlerMiddleware)



const startServer = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName: "Beta-house"})
        app.listen(PORT,()=>{
            console.log({message:`server conected to databate and is listening to port ${PORT}`}); 
        })
    } catch (error) {
        console.log(error);
        
    }
}
startServer()