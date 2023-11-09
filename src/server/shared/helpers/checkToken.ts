import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, RequestHandler, Response } from 'express';

interface userToken {
  user: string;
}

const secret = process.env.JWT_SECRET_KEY || '';
export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Acesso negado, sem token de acesso!' });

  try {
    const verified = await jwt.verify(token, secret);

    if (verified) return next();
    // to continue the flow
  } catch (err) {
    res.status(400).json({ message: 'O Token é inválido!' });
  }
};
