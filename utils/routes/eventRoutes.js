const express = require('express')
const router = express.Router()
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  joinEvent,
  leaveEvent,
  deleteEvent
} = require('../controllers/eventController')
const authMiddleware = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles')
const upload = require('../middleware/upload')

router.get('/', getAllEvents)
router.get('/:id', getEventById)

router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  upload.single('image'),
  createEvent
)

router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  upload.single('image'),
  updateEvent
)

router.post('/:id/join', authMiddleware, joinEvent)
router.post('/:id/leave', authMiddleware, leaveEvent)

router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteEvent)

module.exports = router
