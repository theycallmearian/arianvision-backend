const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/token')

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' })
    }

    const newUser = new User({ name, email, password, role })
    await newUser.save()

    const token = generateToken(newUser)

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      },
      token
    })
  } catch (err) {
    console.error('❌ Error en el registro:', err)
    res
      .status(500)
      .json({ message: 'Error en el registro', error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('📩 Login recibido:', email)
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan credenciales' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      console.warn('❌ Usuario no encontrado')
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.warn('❌ Contraseña incorrecta')
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }

    const token = generateToken(user)
    console.log('✅ Login exitoso para:', user.email)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      token
    })
  } catch (err) {
    console.error('❌ Error en login:', err)
    res.status(500).json({ message: 'Error en el login', error: err.message })
  }
}
