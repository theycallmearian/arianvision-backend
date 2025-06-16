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
const upload = require('../middleware/upload')

router.get('/', getAllEvents)
router.get('/:id', getEventById)

router.post('/', authMiddleware, upload.single('image'), createEvent)
router.put('/:id', authMiddleware, upload.single('image'), updateEvent)

router.post('/:id/join', authMiddleware, joinEvent)
router.post('/:id/leave', authMiddleware, leaveEvent)

router.delete('/:id', authMiddleware, deleteEvent)

module.exports = router
