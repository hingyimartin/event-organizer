import express from 'express';
import {
  signUp,
  login,
  logout,
  getMe,
  refreshAccessToken,
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getMe);
router.post('/refresh', refreshAccessToken);

export default router;
