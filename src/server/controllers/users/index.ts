import * as  create from './create';
import * as login from './login';
import * as edit from './edit';
import * as getUserById from './getUser';
import * as checkUser from './checkUser';


export const UserController = {
  ...create, ...login, ...edit, ...getUserById, ...checkUser
};

