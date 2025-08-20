const router = require('express').Router()
const {createPropertyData,getAllProperty}=require('../controller/property.controller')
const uploadMiddleware = require('../middleware/upload.middleware')

router.post('/create',uploadMiddleware.single('image'), createPropertyData)
router.get('/AllProperties',getAllProperty)

module.exports = router