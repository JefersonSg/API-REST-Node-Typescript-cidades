import { Request, Response } from 'express';
import { Transaction } from '../../database/models/Transaction';
import { StatusCodes } from 'http-status-codes';
import { getToken } from '../../shared/helpers/getToken';
import { getUserByToken } from '../../shared/helpers/getUserByToken';

interface ILimit {
  limit: string
}
interface IUser {
  id: string,
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
}

export const getAll = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const account: string = req.body.account || 0;

  const skip = (page - 1) * limit;

  const token = await getToken(req);
  const user = await getUserByToken(token, res) as IUser;

  try {
    const transactions = await Transaction.find({ userId: user.id, account }).skip(skip).limit(limit);

    return res.status(StatusCodes.ACCEPTED).json({
      transactions
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Ocorreu um erro na consulta' });
  }
};
