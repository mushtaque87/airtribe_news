import { Request, Response } from 'express';
import axios from 'axios';
import log from '../utils/logs';
import { News } from '../models/news';

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
  const { searchquery } = req.params;
  log.info('searchquery', searchquery);
  try {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchquery}&from=2023-10-06&sortBy=publishedAt&apiKey=${process.env.APIKEY}`,
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

export const preferences = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (req.method === 'GET') {
      res.json('GET preferences');
    } else {
      res.json('Mark preferences');
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
      const news = await News.find({ userId: userId });
      log.info('news retreived', news);
      res.json(news);
    } else {
      //res.json('Save News');
      const { title, description, priority, status } = req.body;
      const task = new News({ userId, title, description, priority, status });
      await task.save();
      res.json(task);
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
