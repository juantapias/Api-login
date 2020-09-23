const router = require('express').Router()

const apiUserRouter = require('./api/users')

router.use('/users', apiUserRouter)

module.exports = router