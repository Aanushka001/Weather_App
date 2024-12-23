import express from 'express';
import { register, login, refreshTokenHandler } from '../controllers/authController.js'; // Import functions

const authRouter = express.Router();

authRouter.post('/register', register);          // User registration
authRouter.post('/login', login);                // User login
authRouter.post('/refresh', refreshTokenHandler); // Refresh tokens

export default authRouter;
