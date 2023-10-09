import http from 'http';
import express from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import app from './src/app';
import log from './src/utils/logs';
import dotenv from 'dotenv';
dotenv.config();

//console.log(process.env);

const PORT = process.env.PORT || 9000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/news-manager';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    log.info('Connected to MongoDB');
    app.listen(PORT, () => {
      log.info(`🚀 Server ready at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
