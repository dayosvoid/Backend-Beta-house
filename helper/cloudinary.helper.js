const cloudinary = require('../config/cloudinary.config')

const uploadToCloudinary = async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath)
        if(result && result.secure_url && result.public_id){
        return {
            imgUrl:result.secure_url,
            publicId: result.public_id,
        }}
    } catch (error) {
        console.log(error)
        throw new Error('Cloudinary upload failed: Missing secure URL or public ID.')
    }
}
module.exports = {
    uploadToCloudinary
}