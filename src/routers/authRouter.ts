import express from 'express';
import log from '../utils/logs';
import { signin, signup } from '../controllers/authController';
import { sign } from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/register', signup);
authRouter.post('/login', signin);

export default authRouter;
