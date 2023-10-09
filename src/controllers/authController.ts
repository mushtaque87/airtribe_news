// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcrypt");
// var User = require('../models/user');
import { Request, Response } from 'express';
import { User, UserDocument } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import log from '../utils/logs';
import { v4 as uuidv4 } from 'uuid';

// import { log } from 'winston';

export const signup = async (req: Request, res: Response): Promise<void> => {
  log.info('signup ***', req.body);
  const user = new User({
    userId: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });
  log.info('user ***', user);
  user
    .save()
    .then((data: any) => {
      return res
        .status(200)
        .send({ message: `User saved successfully ${user}` });
    })
    .catch((err: any) => {
      return res.status(500).send({ message: err });
    });
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const emailPassed: string = req.body.email;
  const passwordPassed: string = req.body.password;
  User.findOne({
    email: emailPassed,
  }).then((user: UserDocument | null) => {
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid: boolean = bcrypt.compareSync(
      passwordPassed,
      user.password,
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }
    const token: string = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET || '',
      {
        expiresIn: 86400,
      },
    );
    return res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.firstName + ' ' + user.lastName,
      },
      message: 'Login Successful',
      accessToken: token,
    });
  });
};
