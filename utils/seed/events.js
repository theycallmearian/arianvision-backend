require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')

const User = require(path.join(__dirname, '..', 'models', 'User'))
const Event = require(path.join(__dirname, '..', 'models', 'Event'))

const MONGO_URI = process.env.MONGO_URI

const seedEvents = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('📦 Conectado a MongoDB')

    const users = await User.find()
    const organizer = users.find((u) => u.role === 'organizer')
    const attendees = users.filter((u) => u.role !== 'organizer')

    if (!organizer) throw new Error('No hay usuario con rol "organizer"')

    await Event.deleteMany()
    console.log('🧹 Eventos anteriores eliminados')

    const sampleEvents = [
      {
        title: 'Impro Summer Show!',
        date: new Date('2025-07-15'),
        location: 'Mataró,  España',
        description:
          'Este verano si estás en Mataró, déjate sorprender con un Impro Show bien fresquito: Improshow Summer Edition. Si ya conoces el clásico Impro Show, estarás encantado de refrescar tus risas con el ya tradicional estilo que les caracteriza, esta vez con nuevos juegos que nos ponen en sintonía con el clima!.',
        imageUrl:
          'https://res.cloudinary.com/dye4qdrys/image/upload/v1748802957/arianvision/events/impro-show-cartel_gwccz9.png',
        attendees: attendees.map((u) => u._id),
        organizer: organizer._id,
        capacity: 140
      },
      {
        title: 'Damiano David - Funny Little Fears (World Tour)',
        date: new Date('2025-09-21'),
        location: 'Barcelona, España',
        description:
          'Damiano David se embarca en una impresionante gira mundial para 2025, esta gira es una verdadera declaración de intenciones, con la que Damiano David continúa consolidándose como artista a nivel mundial.',
        imageUrl:
          'https://res.cloudinary.com/dye4qdrys/image/upload/v1748802958/arianvision/events/436f_dcilrb.jpg',
        attendees: [attendees[1]?._id],
        organizer: organizer._id,
        capacity: 1400
      },
      {
        title: 'Málaga CON',
        date: new Date('2025-09-25'),
        location: 'Málaga, España',
        description:
          'La ciudad de Málaga se prepara para acoger uno de los eventos más esperados del mundo del entretenimiento, la Comic Con 2025. Esta edición será muy especial, ya que por primera vez sale de Estados Unidos para celebrarse en Europa..',
        imageUrl:
          'https://res.cloudinary.com/dye4qdrys/image/upload/v1748802955/arianvision/events/COMICCON_MALAGA_qaxerc.jpg',
        attendees: [],
        organizer: organizer._id,
        capacity: 5500
      }
    ]

    const created = await Event.insertMany(sampleEvents)
    console.log(
      '✅ Eventos insertados:',
      created.map((e) => e.title)
    )

    process.exit(0)
  } catch (err) {
    console.error('❌ Error al insertar eventos:', err.message)
    process.exit(1)
  }
}

seedEvents()
