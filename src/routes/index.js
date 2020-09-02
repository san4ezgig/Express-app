import { authController } from '../controllers';
import express from 'express';

const router = express.Router();

router.post('/signup', authController.signUp);

router.post('/login', authController.signIn);

export default router;
