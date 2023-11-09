import { Request, Response } from 'express';
import { Transaction } from '../../database/models/Transaction';

export const getById = async (req: Request, res: Response) => {
  const transaction = await Transaction.findById(req.body.id);

  res.status(200).json({
    transaction
  });
};
