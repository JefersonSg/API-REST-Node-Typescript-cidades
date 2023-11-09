import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TransactionController } from '../controllers';
import { checkToken } from '../shared/helpers/checkToken';

const transactionRouter = Router();

transactionRouter.get('/get', checkToken, TransactionController.getById);
transactionRouter.get('/getall', checkToken, TransactionController.getAll);

// POST
transactionRouter.post('/create', checkToken, TransactionController.validationCreate, TransactionController.create);

transactionRouter.post('/edit', checkToken, TransactionController.validationEdit, TransactionController.edit);

// DELETE
transactionRouter.delete('/delete', checkToken, TransactionController.deleteById);

export { transactionRouter };
