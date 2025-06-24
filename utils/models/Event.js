const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: String,
    capacity: { type: Number, required: true },
    imageUrl: String,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

eventSchema.virtual('availableSlots').get(function () {
  return this.capacity - (this.attendees ? this.attendees.length : 0)
})

module.exports = mongoose.model('Event', eventSchema)
