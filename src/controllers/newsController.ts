import { Request, Response } from 'express';

export const hello = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json('Hello World');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
