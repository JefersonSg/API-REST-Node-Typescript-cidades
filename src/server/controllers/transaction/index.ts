import * as create from './create';
import * as edit from './edit';
import * as getAll from './getAll';
import * as getById from './getById';
import * as deleteById from './delete';

export const TransactionController = {
  ...create, ...edit, ...getAll, ...getById, ...deleteById
};
