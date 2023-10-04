import express from 'express';
import log from '../utils/logs';
import { hello } from '../controllers/newsController';

const router = express.Router();

router.get('/', hello);

export default router;
