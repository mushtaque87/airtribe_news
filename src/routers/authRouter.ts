import express from 'express';
import log from '../utils/logs';
import { signin, signup } from '../controllers/authController';
import { sign } from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);

export default authRouter;
