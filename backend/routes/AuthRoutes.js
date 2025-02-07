import express from 'express';
import { register,login, getUserDetails } from '../controllers/AuthController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

//Protect routes
router.get('/profile',getUserDetails);

export default router;