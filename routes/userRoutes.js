const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles')
const { deleteUser } = require('../controllers/userController')

router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteUser)

module.exports = router
