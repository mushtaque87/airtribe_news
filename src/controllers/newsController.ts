import { Request, Response } from 'express';
import axios from 'axios';
import log from '../utils/logs';
import config from '../config/config.json';
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
  const { searchquery } = req.params;
  try {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchquery}&from=2023-09-06&sortBy=publishedAt&apiKey=${config.APIKEY}`,
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

export const read = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.method === 'GET') {
      res.json('GET News');
    } else {
      res.json('Mark News');
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
