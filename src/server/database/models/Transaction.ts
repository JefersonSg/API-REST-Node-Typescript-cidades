import { mongoose } from '../conn';

const transactionSchema = new mongoose.Schema({
  account: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  revenue: { Boolean },
  category: {
    type: String,
    required: true,
  },
  finishValue: { type: String },
  installments: { type: String },
  fee: { type: String },
  feeMonth: { type: String },
  userId: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export { Transaction };
