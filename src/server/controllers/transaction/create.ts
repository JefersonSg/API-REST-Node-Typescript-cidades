import { Request, Response } from 'express';
import { validate } from '../../shared/middleware';
import * as yup from 'yup';
import { getToken } from '../../shared/helpers/getToken';
import { getUserByToken } from '../../shared/helpers/getUserByToken';
import { Transaction } from '../../database/models/Transaction';
import { StatusCodes } from 'http-status-codes';

interface IUserId {
  id: string;
}
export const validationCreate = validate({
  body: yup.object().shape({
    account: yup.number().required(),
    type: yup.string().required(),
    name: yup.string().required(),
    date: yup.date().required(),
    revenue: yup.boolean().required(),
    category: yup.string().required(),
    value: yup.string().required(),
    finishValue: yup.string(),
    installments: yup.string(),
    fee: yup.string(),
    feeMonth: yup.string(),
  })
});

export const create = async (req: Request, res: Response) => {

  const token = getToken(req);

  const userId = await getUserByToken(token, res) as IUserId;

  const { account, type, name, value, finishValue, installments, fee, feeMonth, date, revenue, category } = req.body;

  const transaction = await new Transaction({
    account, type, name, value, date, revenue, category, userId: userId.id,
    finishValue, installments, fee, feeMonth
  });

  try {
    const newTransaction = await transaction.save();

    res.status(StatusCodes.CREATED).json({
      message: 'Receita registrada com sucesso',
      newTransaction
    });
  } catch (error) {
    res.status(500).json({ message: error });

  }

};
