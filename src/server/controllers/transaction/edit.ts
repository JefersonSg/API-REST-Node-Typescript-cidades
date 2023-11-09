import { StatusCodes } from 'http-status-codes';
import { Transaction } from '../../database/models/Transaction';
import { getToken } from '../../shared/helpers/getToken';
import { getUserByToken } from '../../shared/helpers/getUserByToken';
import { Request, Response } from 'express';
import { validate } from '../../shared/middleware';
import * as yup from 'yup';


interface IUserId {
  id: string;
}
type TTransaction = {
  type: string,
  name: string,
  value: string,
  date: string,
  revenue: boolean,
  category: string,
  finishValue?: string,
  installments?: string,
  fee?: string,
  feeMonth?: string,
}
export const validationEdit = validate({
  body: yup.object().shape({
    id: yup.string().required(),
    type: yup.string().required(),
    name: yup.string().required(),
    date: yup.date().required(),
    revenue: yup.boolean().required(),
    category: yup.string().required(),
    value: yup.string().required().min(1),
    finishValue: yup.string().min(1),
    installments: yup.string().min(1),
    fee: yup.string().min(1),
    feeMonth: yup.string().min(1),
  })
});

export const edit = async (req: Request, res: Response) => {

  const transaction = await Transaction.findById(req.body.id);

  if (!transaction) {
    return res.status(404).json({
      error: 'Transação não encontrada'
    });
  }

  const { type, name, value, date, revenue, category,
    finishValue, installments, fee, feeMonth } = req.body;

  const NewUpdate: TTransaction = {
    type,
    name,
    value,
    date,
    revenue,
    category,
    finishValue,
    installments,
    fee,
    feeMonth
  };

  try {
    const update = await Transaction.findOneAndUpdate(
      { _id: req.body.id },
      { $set: NewUpdate },
      { new: true },
    );
    res.status(StatusCodes.OK).json({
      message: 'Transação editada com sucesso!',
      update
    });
  } catch (error) {
    res.status(500).json({ message: error });

  }

};
