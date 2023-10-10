import express from 'express';
import log from '../utils/logs';
import {
  favorite,
  getNews,
  getNewsForPreference,
  preferences,
  read,
} from '../controllers/newsController';
import { signin, signup } from '../controllers/authController';
import { sign } from 'jsonwebtoken';
import { verifyToken } from '../middlewares/authJWT';

const newsRouter = express.Router();

newsRouter.get('/:userId', verifyToken, getNewsForPreference);
newsRouter.get('/search/:keyword', verifyToken, getNews);
newsRouter.get('/:userId/read', verifyToken, read);
newsRouter.post('/:userId/read', verifyToken, read);
newsRouter.get('/favorite', favorite);
newsRouter.post('/favorite', favorite);
newsRouter.get('/:userId/preferences', verifyToken, preferences);
newsRouter.post('/:userId/preferences', verifyToken, preferences);

export default newsRouter;
