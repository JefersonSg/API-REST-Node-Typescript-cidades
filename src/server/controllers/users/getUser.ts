import { Request, Response } from 'express';
import { User } from '../../database/models/User';

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(422).json({ message: 'Usuário não encontrado!' });
    return;
  }

  res.status(200).json({ user });
};
