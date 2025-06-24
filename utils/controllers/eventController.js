const Event = require('../models/Event')

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al obtener eventos', error: err.message })
  }
}

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }
    res.json(event)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al buscar evento', error: err.message })
  }
}
exports.createEvent = async (req, res) => {
  try {
    const { title, date, location, description, capacity } = req.body
    const organizerId = req.user._id
    let imageUrl = ''

    if (req.file && req.file.path) {
      imageUrl = req.file.path
    }

    const newEvent = new Event({
      title,
      date: new Date(date),
      location,
      description,
      capacity: parseInt(capacity, 10),
      imageUrl,
      organizer: organizerId,
      attendees: []
    })

    const savedEvent = await newEvent.save()
    res.status(201).json(savedEvent)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al crear evento', error: err.message })
  }
}
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id
    const { title, date, location, description, capacity } = req.body
    const userId = req.user._id

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }
    if (
      event.organizer.toString() !== userId.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para editar este evento' })
    }

    if (title !== undefined) event.title = title
    if (date !== undefined) event.date = new Date(date)
    if (location !== undefined) event.location = location
    if (description !== undefined) event.description = description
    if (capacity !== undefined) event.capacity = parseInt(capacity, 10)
    if (req.file && req.file.path) event.imageUrl = req.file.path

    const updatedEvent = await event.save()
    res.json({
      message: 'Evento actualizado correctamente',
      event: updatedEvent
    })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error actualizando evento', error: err.message })
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    if (
      event.organizer.toString() !== userId.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para eliminar este evento' })
    }

    await Event.findByIdAndDelete(eventId)
    res.json({ message: 'Evento eliminado correctamente' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error eliminando evento', error: err.message })
  }
}

exports.joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'Ya estás inscrito en este evento' })
    }

    if (
      event.capacity !== undefined &&
      event.attendees.length >= event.capacity
    ) {
      return res.status(400).json({ message: 'El evento está completo' })
    }

    event.attendees.push(userId)
    const saved = await event.save()
    res.json({ message: 'Te has unido al evento', event: saved })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al unirse al evento', error: err.message })
  }
}

exports.leaveEvent = async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    if (!event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'No estabas inscrito en este evento' })
    }

    event.attendees = event.attendees.filter(
      (attendeeId) => attendeeId.toString() !== userId.toString()
    )
    const saved = await event.save()
    res.json({ message: 'Te has retirado del evento', event: saved })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al retirarse del evento', error: err.message })
  }
}
exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id
    const events = await Event.find({ attendees: userId })
    res.json(events)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al obtener tus eventos', error: err.message })
  }
}
