import express from 'express';
import UserController from '../controllers/UserController.js';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/checkRole.js';
const router = express.Router();
router.get('/', auth, checkRole(['Dios', 'admin']), UserController.getAll);
router.post('/register', UserController.register)
router.post('/login', UserController.login);
router.get('/profile', auth, (req, res) => res.send(req.user))
export default router;