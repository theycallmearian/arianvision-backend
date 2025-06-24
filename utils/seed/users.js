require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const User = require(path.join(__dirname, '..', 'models', 'User'))

const MONGO_URI = process.env.MONGO_URI

const seedUsers = [
  {
    name: 'Àrian Admin',
    email: 'admin@arianvision.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Àrian Usuario',
    email: 'arianuser@correo.com',
    password: '123456',
    role: 'user'
  },
  {
    name: 'Meri Organizadora',
    email: 'meri@eventos.com',
    password: '123456',
    role: 'organizer'
  }
]

;(async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('📦 Conectado a MongoDB')

    await User.deleteMany()
    console.log('🧹 Usuarios anteriores eliminados')

    const createdUsers = []

    for (const userData of seedUsers) {
      const user = new User(userData)
      await user.save()
      createdUsers.push(user)
    }

    console.log(
      '✅ Usuarios insertados:',
      createdUsers.map((u) => u.email)
    )

    process.exit(0)
  } catch (err) {
    console.error('❌ Error al insertar usuarios:', err.message)
    process.exit(1)
  }
})()
