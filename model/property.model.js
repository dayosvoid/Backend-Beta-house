const mongoose = require('mongoose')
const Schema = mongoose.Schema


// property schema
const propertySchema = new Schema({
    image:{
        type:String,
        default: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
        required:true
    },
    publicId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        trim:true,
        required: [true,'name is required']
    },
    location: {
        type: String,
        trim:true,
        required: [true, 'location is required'],
   },
    description: {
        bedRoom:{
            type:Number,
            required:true
        },
        bathRoom:{
            type:Number,
            required:true
        }

    },
    price:{
        type:Number,
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('property', propertySchema)