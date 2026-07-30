import { Router } from 'express'
import { deleteMe, getMe, updateMe, updatePassword } from '../controllers/userController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
const router = Router(); router.use(authenticate); router.get('/me', getMe); router.patch('/me', updateMe); router.patch('/password', updatePassword); router.delete('/me', deleteMe); export default router
