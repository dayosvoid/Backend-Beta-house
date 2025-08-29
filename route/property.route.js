const router = require('express').Router()
const {createPropertyData,getAllProperty,searchForProperty}=require('../controller/property.controller')
const uploadMiddleware = require('../middleware/upload.middleware')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/create',uploadMiddleware.single('image'), createPropertyData)
router.get('/AllProperties',getAllProperty)
router.get('/findProperties/',authMiddleware,searchForProperty)

module.exports = router