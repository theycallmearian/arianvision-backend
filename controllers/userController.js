const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json(user)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al obtener perfil', error: err.message })
  }
}

exports.updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.name = name
    user.email = email

    if (password) {
      user.password = password
    }

    await user.save()

    const updated = user.toObject()
    delete updated.password
    res.json(updated)
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error al actualizar perfil', error: err.message })
  }
}

exports.deleteMe = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.user.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(204).end()
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al eliminar cuenta', error: err.message })
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const { currentPassword, newPassword } = req.body

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' })
    }

    user.password = newPassword
    await user.save()

    res.json({ message: 'Contraseña cambiada correctamente' })
  } catch (err) {
    next(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al eliminar usuario', error: err.message })
  }
}
