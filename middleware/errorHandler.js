function errorHandler(err, req, res, next) {
  console.error('💥 Error:', err.stack)

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

module.exports = errorHandler
