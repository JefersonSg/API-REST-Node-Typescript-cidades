import { User } from '../../database/models/User';
import { Request, Response } from 'express';
import { validate } from '../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { createUserToken } from '../../shared/helpers/createUserToken';



interface IUser {
  username: string,
  password: string,
}

interface IDBUser {
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
  _id: string
}

export const loginValidate = validate({
  body: yup.object().shape({
    username: yup.string().min(3).required(),
    password: yup.string().min(6).required()
  })
});

export const login = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username }) as IDBUser;

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Usuario não encontrado'
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: 'Senha inválida' });
  }

  await createUserToken(user, req, res);
};
