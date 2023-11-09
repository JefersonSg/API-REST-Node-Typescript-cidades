import { Request, Response } from 'express';
import { getToken } from '../../shared/helpers/getToken';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../../database/models/User';
import { getUserByToken } from '../../shared/helpers/getUserByToken';


interface IUser {
  username: string,
  password: string,
}

export const checkUser = async (req: Request, res: Response) => {
  let currentUser;

  if (req.headers.authorization) {

    const token: string | null = getToken(req);
    const secret = process.env.JWT_SECRET_KEY || '';

    if (!token) {
      return;
    }

    const currentUser = await getUserByToken(token, res) as IUser;

    currentUser.password = '';
    res.status(200).json({
      currentUser
    });

  } else {
    currentUser = null;
  }

  res.status(200).send(currentUser);
};
