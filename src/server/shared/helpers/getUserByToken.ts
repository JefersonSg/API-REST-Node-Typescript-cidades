import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../../database/models/User';
import { Response } from 'express';

interface userToken {
  email: string;
  id: string;
}


const secret = process.env.JWT_SECRET_KEY || '';

export const getUserByToken = async (token: string | null, res: Response) => {

  if (!token) {
    return res.status(401).json({ message: 'Acesso Negado, sem token de acesso!' });
  }

  const decoded = await jwt.verify(token, secret) as userToken;

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};
