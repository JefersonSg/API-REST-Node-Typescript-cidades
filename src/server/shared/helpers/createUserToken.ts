import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface IUser {
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
  _id: string
}

const secret = process.env.JWT_SECRET_KEY || '';
export const createUserToken = async (user: IUser, req: Request, res: Response) => {
  const token = jwt.sign({ email: user.email, id: user._id }, secret);

  // return token
  res.status(StatusCodes.CREATED).json({
    message: 'Você está autenticado',
    token: token,
    userId: user._id,
  });

};

