// middleware/upload.middleware.js

const multer = require('multer');

// Configure disk storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // This is a temporary directory to store uploaded files
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Use a unique name to prevent file overwrites
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });

// Export the upload instance so it can be used in your routes
module.exports = upload;