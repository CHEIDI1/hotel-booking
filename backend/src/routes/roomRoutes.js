import { Router } from 'express'
import { createRoom, listRooms } from '../controllers/roomController.js'
import { authenticate, authorize } from '../middlewares/authMiddleware.js'
const router = Router(); router.get('/', listRooms); router.post('/', authenticate, authorize('admin'), createRoom); export default router
