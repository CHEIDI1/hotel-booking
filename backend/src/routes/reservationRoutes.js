import { Router } from 'express'
import { cancelReservation, createReservation, dashboard, listReservations, listAllReservations } from '../controllers/reservationController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticate)
router.get('/', listReservations)
router.post('/', createReservation)
router.patch('/:id/cancel', cancelReservation)
router.get('/dashboard', dashboard)
router.get('/all', listAllReservations)

export default router
