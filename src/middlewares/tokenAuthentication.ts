import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

dotenv.config();

const tokenAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // add token in middleware to use it any where in handlers
    const tokenSecret = process.env.TOKEN_SECRET as Secret;
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, tokenSecret);
    return next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export default tokenAuthentication;
