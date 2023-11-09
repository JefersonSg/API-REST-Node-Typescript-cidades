import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './shared/services/TranslationsYup';
import { userRouter } from './routes/UserRoutes';
import { transactionRouter } from './routes/TransactionRoutes';
import { router } from './routes';

const server = express();

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));

server.use(express.json());

server.use('/', router);
server.use('/user', userRouter);
server.use('/transaction', transactionRouter);

export { server };
