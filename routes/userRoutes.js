// routes/userRoutes.js
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

router.get('/me', authMiddleware, getMe)
router.patch('/me', authMiddleware, updateMe)
router.put('/me', authMiddleware, updateMe)
router.delete('/me', authMiddleware, deleteMe)
router.get('/me/events', authMiddleware, getUserEvents)

router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteUser)

module.exports = router
