const express = require('express') 
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')
const errorHandler = require('./middleware/errorHandler')

const allowedOrigins = [
  'https://arianvision.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  optionsSuccessStatus: 200
}));

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de ArianVision!')
})

app.use(errorHandler)

module.exports = app
