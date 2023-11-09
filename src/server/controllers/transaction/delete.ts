import { Request, Response } from 'express';
import { Transaction } from '../../database/models/Transaction';
import { getToken } from '../../shared/helpers/getToken';
import { getUserByToken } from '../../shared/helpers/getUserByToken';

export const deleteById = async (req: Request, res: Response) => {

  const transaction = await Transaction.findOne({ _id: req.body.id });
  const id = req.body.id;

  if (!transaction) return res.status(403).json({
    error: 'transação não encontrada'
  });
  try {
    await Transaction.findByIdAndDelete(id);

    return res.json({
      message: 'transação removida com sucesso'
    });

  } catch (error) {
    return res.status(404).json({
      message: 'Erro ao deletar a transação' + error
    });
  }
};
