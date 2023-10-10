import { Request, Response } from 'express';
import axios from 'axios';
import log from '../utils/logs';
import { News } from '../models/news';
import { Preferences } from '../models/preferance';
import crypto from 'crypto';
import { generateId } from '../utils/utils';

// const news = [
//   {
//     id: 1,
//     title: 'News 1',
//     description: 'News 1 description',
//     content: 'News 1 content',
//     url: 'https://www.google.com',
//     urlToImage: 'https://www.google.com',
//     publishedAt: '2020-01-01T00:00:00Z',
//   },
//   {
//     id: 2,
//     title: 'News 2',
//     description: 'News 2 description',
//     content: 'News 2 content',
//     url: 'https://www.google.com',
//     urlToImage: 'https://www.google.com',
//     publishedAt: '2020-01-01T00:00:00Z',
//   },
// ];

export const getNews = async (req: Request, res: Response): Promise<void> => {
  log.info('getNews', req.params);
  if (!req.user) {
    res.status(403).send({
      message: req.message,
    });
    return;
  }
  const { keyword } = req.params;
  log.info('keyword', keyword);

  try {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${keyword}&from=2023-10-06&sortBy=publishedAt&apiKey=${process.env.APIKEY}`,
      )
      .then(
        (response: any) => {
          log.info(response.data);
          res.status(200).json(response.data.articles);
        },
        error => {
          console.log(error);
        },
      );
  } catch (err) {
    log.error(err);
    res.status(500).send('Server error');
  }
};

export const getNewsForPreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  log.info('getNews', req.params);
  if (!req.user) {
    res.status(403).send({
      message: req.message,
    });
    return;
  }
  const { userId } = req.params;
  const { keyword } = req.params;
  log.info('keyword', keyword);

  try {
    const preferences = await Preferences.find({ userId: userId });
    log.info('preferences', preferences);
    const randomIndex = Math.floor(Math.random() * preferences.length);
    const randomPreference = preferences[randomIndex].preference;
    log.info('randomPreference', randomPreference);

    axios
      .get(
        `https://newsapi.org/v2/everything?q=${randomPreference}&from=2023-10-06&sortBy=publishedAt&apiKey=${process.env.APIKEY}`,
      )
      .then(
        (response: any) => {
          const articles = response.data.articles;
          const randomIndex = Math.floor(Math.random() * articles.length);
          const randomArticle = articles[randomIndex];
          log.info(randomIndex);

          const { title, description, url, urlToImage, status } = randomArticle;
          const newsId = generateId();
          const news = new News({
            newsId,
            userId,
            title,
            description,
            read: true,
          });
          news.save();
          res.status(200).json(randomArticle);
        },
        error => {
          console.log(error);
        },
      );
  } catch (err) {
    log.error(err);
    res.status(500).send('Server error');
  }
};

export const preferences = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(403).send({
      message: req.message,
    });
    return;
  }
  const { userId } = req.params;
  const { preference } = req.body;
  log.info('userId', userId);
  try {
    if (req.method === 'GET') {
      //res.json('GET News');
      const preference = await Preferences.find({ userId: userId });
      log.info('preference retreived', preference);
      res.json(preference);
    } else {
      //res.json('Save News');
      const { title, description, priority, status } = req.body;
      // let currentPreferences = await Preferences.find({ userId: userId });
      // log.info('currentPreferences', currentPreferences);
      const newpreference = new Preferences({
        userId,
        preference: preference,
      });
      log.info('newpreference', newpreference);
      await newpreference.save();
      res.json(newpreference);
    }
  } catch (err) {
    log.error(err);
    res.status(500).send('Server error');
  }
};

export const read = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(403).send({
      message: req.message,
    });
    return;
  }
  const { userId } = req.params;
  log.info('userId', userId);
  try {
    if (req.method === 'GET') {
      //res.json('GET News');
      const news = await News.find({ userId: userId, read: true });
      log.info('news retreived', news);
      res.json(news);
    } else {
      //res.json('Save News');
      const newsId = generateId();
      const { title, description, priority, status } = req.body;
      const news = new News({
        newsId,
        userId,
        title,
        description,
        priority,
        status,
      });
      await news.save();
      res.json(news);
    }
  } catch (err) {
    log.error(err);
    res.status(500).send('Server error');
  }
};

export const favorite = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.method === 'GET') {
      res.json('GET Fav');
    } else {
      res.json('Mark Fav');
    }
  } catch (err) {
    log.error(err);
    res.status(500).send('Server error');
  }
};
