import express from 'express';
import log from '../utils/logs';
import { favorite, getNews, read } from '../controllers/newsController';
import { signin, signup } from '../controllers/authController';
import { sign } from 'jsonwebtoken';
import { verifyToken } from '../middlewares/authJWT';

const newsRouter = express.Router();

newsRouter.get('/:searchquery', verifyToken, getNews);
newsRouter.get('/:userId/read', verifyToken, read);
newsRouter.post('/:userId/read', verifyToken, read);
newsRouter.get('/favorite', favorite);
newsRouter.post('/favorite', favorite);
newsRouter.post('/preferences', favorite);
newsRouter.post('/preferences', favorite);

export default newsRouter;
