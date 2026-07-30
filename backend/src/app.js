import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import { dashboard } from './controllers/reservationController.js'
import { authenticate } from './middlewares/authMiddleware.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
const app = express(); const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(origin => origin.trim()).filter(Boolean)
app.use(cors({ origin(origin, callback) { const local = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || ''); callback(null, !origin || local || allowedOrigins.includes(origin)) } })); app.use(express.json()); app.get('/api/health', (req, res) => res.json({ status: 'ok' })); app.use('/api/auth', authRoutes); app.use('/api/auth', userRoutes); app.use('/api/rooms', roomRoutes); app.use('/api/reservations', reservationRoutes); app.get('/api/dashboard', authenticate, dashboard); app.use(notFound); app.use(errorHandler); export default app
