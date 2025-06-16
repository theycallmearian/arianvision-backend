const User = require('../models/User')

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)
    if (!deleted)
      return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error al eliminar usuario', error: err.message })
  }
}

module.exports = { deleteUser }
