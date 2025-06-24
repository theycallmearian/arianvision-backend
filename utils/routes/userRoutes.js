const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles')
const {
  getMe,
  updateMe,
  deleteMe,
  deleteUser
} = require('../controllers/userController')

const { getUserEvents } = require('../controllers/eventController')

router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteUser)

router.get('/me', authMiddleware, getMe)

router.patch('/me', authMiddleware, updateMe)

router.delete('/me', authMiddleware, deleteMe)

router.get('/me/events', authMiddleware, getUserEvents)

module.exports = router
