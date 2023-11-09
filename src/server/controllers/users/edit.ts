import { Request, Response } from 'express';
import { User } from '../../database/models/User';
import jwt from 'jsonwebtoken';
import { getToken } from '../../shared/helpers/getToken';
import { getUserByToken } from '../../shared/helpers/getUserByToken';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validate } from '../../shared/middleware';
import bcrypt from 'bcrypt';


interface IUser {
  id: string,
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
}

export const updateUserValidate = validate({
  body: yup.object().shape({
    name: yup.string().required().min(3),
    surname: yup.string().required().min(3),
    email: yup.string().email().required(),
    username: yup.string().required().min(3),
    password: yup.string().min(6).required(),
  })
});

export const editUser = async (req: Request, res: Response) => {
  const token: string | null = getToken(req);

  if (token === null) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: 'sem token de acesso!'
    });
  }

  const user = await getUserByToken(token, res) as IUser;

  if (!user) {
    res.status(StatusCodes.CONFLICT).json({ error: 'Nenhum usuario foi encontrado!' });
  }

  const { name, surname, username, email, password } = req.body;

  user.name = name;
  user.surname = surname;
  user.username = username;
  user.email = email;

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: 'Senha inválida' });
  }

  // check if the email and username already used
  const userExists = await User.findOne({ email: email });
  const userNameExists = await User.findOne({ username: username });

  if (user.email !== email && userExists) {
    return res.status(StatusCodes.CONFLICT).json({
      error: 'Email já utilizado'
    });
  }

  if (user.username !== username && userNameExists) {
    return res.status(StatusCodes.CONFLICT).json({
      error: 'nome de usuario já utilizado'
    });
  }

  try {
    // returns updated data
    const updatedUser = await User.findOneAndUpdate(
      { _id: user.id },
      { $set: user },
      { new: true },
    );
    res.json({
      message: 'Usuário atualizado com sucesso!',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }

};
