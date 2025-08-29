const Property = require('../model/property.model')
const {uploadToCloudinary} = require('../helper/cloudinary.helper')
const fs = require('fs') 
const propertyModel = require('../model/property.model')


const createPropertyData = async(req,res,next)=>{
    const {name,location,price} = req.body
    let fileDeleted = false

    let description;
    try {
        if (req.body.description) {
            description = JSON.parse(req.body.description);
        }
    } catch (parseError) {
        // Handle cases where the JSON parsing fails
        return res.status(400).json({ success: false, message: "Invalid JSON format for description." });
    }

    if(!name || !location || !description || !price){
      return  res.status(401).json({success:false, message:"provide product infomation"})
    }

    try {

        if(!req.file)
          return res.status(400).json({success:false, message:'dont forget to upload the image file'})

        // upload to cloudinary
        const {imgUrl, publicId} = await uploadToCloudinary(req.file.path)

        // store e image url and public id in our db
                const newlyCreatePropertyData = await Property.create({
            image:imgUrl,
            publicId,
            name,
            location,
            description,
            price,
        });

        fs.unlinkSync(req.file.path);
        fileDeleted = true;

        if(newlyCreatePropertyData) {
            res.status(201).json(
                {success:true,
                 newlyCreatePropertyData})
        }
    } catch (error) {
        if (!fileDeleted && req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        console.log({message:'error while uploading'});
        next(error)
    }finally {
        // This block will always execute to clean up the temporary file
        if (localFilePath && fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath);
                console.log(`Local file ${localFilePath} deleted successfully.`);
            } catch (unlinkError) {
                console.error(`Error deleting local file ${localFilePath}:`, unlinkError);
            }
  }    }
}

const getAllProperty = async (req, res, next) => {
  try {
    const PAGE_SIZE = 9;
    const page = parseInt(req.query.page, 10) || 1;

    const skip = (page - 1) * PAGE_SIZE;
    const total = await Property.countDocuments({});

    const allProperties = await Property.find({}).limit(PAGE_SIZE).skip(skip);

    res.json({
      success: true,
      totalItems: total,
      totalPages: Math.ceil(total / PAGE_SIZE),
      currentPage: page,
      properties: allProperties,
    });
  } catch (error) {
    next(error);
  }
};


const searchForProperty = async (req, res, next) => {
  const { location, bedroom, name } = req.query;
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (bedroom) {

    if (!isNaN(bedroom)) {
      query['description.bedRoom'] = parseInt(bedroom);
    }
  }

  try {
    const searchedProperty = await Property.find(query);

    if (searchedProperty.length === 0) {
      return res.status(404).json({ message: 'No properties found matching the criteria.' });
    }
    return res.status(200).json({ searchedProperty });

  } catch (error) {
    next(error);
  }
};


module.exports = {
    createPropertyData,
    getAllProperty,
    searchForProperty
}