import express from 'express';
import log from '../utils/logs';
import { favorite, getNews, read } from '../controllers/newsController';
import { signin, signup } from '../controllers/authController';
import { sign } from 'jsonwebtoken';

const newsRouter = express.Router();

newsRouter.get('/news/:searchquery', getNews);
newsRouter.get('/read', read);
newsRouter.post('/read', read);
newsRouter.get('/favorite', favorite);
newsRouter.post('/favorite', favorite);

export default newsRouter;
