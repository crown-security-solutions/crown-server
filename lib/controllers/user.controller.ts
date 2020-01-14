import { Request, Response } from 'express';
import { User } from '../models/user.model';

export class UserController{

	public index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((nodes: Array<User>) => res.json(nodes))
      .catch((err: Error) => res.status(500).json(err));
  }
}