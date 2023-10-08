import { User } from '../models/user';
import { Secret } from 'jsonwebtoken';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import log from '../utils/logs';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  log.info('authJWT', req.headers.authorization);
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET || '',

      (err: VerifyErrors | null, decode: any) => {
        if (err) {
          req.user = undefined;
          req.message = 'Header verification failed';
          next();
        } else {
          User.findOne({
            _id: decode.id,
          })
            .then(user => {
              req.user = user;
              req.message = 'Found the user successfully';
              next();
            })
            .catch(err => {
              req.user = undefined;
              req.message = 'Some error while finding the user';
              next();
            });
        }
      },
    );
  } else {
    req.user = undefined;
    req.message = 'Authorization header not found';
    next();
  }
};

// export const verifyTokens = (req: Request, res: Response, next: any) => {
//   log.info('verifyToken', req.headers.authorization);
//   log.info('verifyToken body', req);

//   if (req.headers && req.headers.authorization) {
//     const apiSecret: Secret | undefined = process.env.API_SECRET;
//     if (!apiSecret) {
//       req.user = undefined;
//       req.message = 'API secret not found';
//       next();
//     }
//     authJWT(req, res, next);
//   }
// };
