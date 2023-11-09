import { Request } from 'express';

export const getToken = (req: Request) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    const token = null;
    return token;
  }
  const token: string = authHeader && authHeader.split(' ')[1];

  return token;
};
