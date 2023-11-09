import { Router } from 'express';
import { UserController } from '../controllers/';
import { checkToken } from '../shared/helpers/checkToken';

const userRouter = Router();

userRouter.get('/',
  checkToken,
  UserController.checkUser);

userRouter.post('/create',
  UserController.createUserValidate,
  UserController.create);

userRouter.post('/login',
  UserController.loginValidate,
  UserController.login);

userRouter.post('/edit',
  checkToken,
  UserController.updateUserValidate,
  UserController.editUser);

export { userRouter };
