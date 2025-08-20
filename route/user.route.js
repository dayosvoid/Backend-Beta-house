const router = require('express').Router()
const { handleRegister, handleLogin } = require("../controller/user.controller")

router.post('/register', handleRegister)
router.post('/login', handleLogin)


module.exports = router