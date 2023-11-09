import { User } from '../../database/models/User';
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validate } from '../../shared/middleware/Validation';
import bcrypt from 'bcrypt';
import { createUserToken } from '../../shared/helpers/createUserToken';

interface IUser {
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
}

export const createUserValidate = validate({
  body: yup.object().shape({
    name: yup.string().required().min(3),
    surname: yup.string().required().min(3),
    email: yup.string().email().required(),
    username: yup.string().required().min(3),
    password: yup.string().min(6).required(),
    confirmpassword: yup.string().oneOf([yup.ref('password')], 'As senhas digitadas devem ser iguals').required().min(6)
  }),
});

export const create = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { name, surname, email, username, password } = req.body;

  const emailUsed = await User.findOne({ email: email });
  const usernameUsed = await User.findOne({ username: username });

  if (emailUsed) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'este email já está cadastrado'
    });
  }
  if (usernameUsed) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'este nome de usuário já está cadastrado'
    });
  }

  const salt: string = await bcrypt.genSalt(12);
  const passwordHash: string = await bcrypt.hash(password, salt);

  const user = await new User({
    name, surname, email, username, password: passwordHash
  });

  try {
    const newUser: any = await user.save();

    createUserToken(newUser, req, res);

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

