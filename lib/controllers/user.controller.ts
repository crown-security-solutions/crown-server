import { Request, Response } from 'express';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import { secret } from '../config/database';
import { Role } from '../models/role.model';
import { UserAudit } from '../models/user_audit.model';
import { Helper } from '../config/helper';

export class UserController{
	authenticate(req: Request, res: Response) {
	  return User
      .findOne({
        where: {
          corp_email: req.body.email,
          active: 1,
          password: Helper.decryptData(req.body.password)
        }
      })
      .then((user: any) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        const token = jwt.sign({ sub: user.id, role: user.role_id }, secret);
        const { password, ...userWithoutPassword } = user.dataValues;
        const response = {
            ...userWithoutPassword,
            token
        };
        return res.status(200).send(response);
      })
      .catch((error) => res.status(400).send(error));
	}

	create(req: Request, res: Response) {
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        role_id: req.body.role_id,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        pan: req.body.pan,
        adhaar: req.body.adhaar,
        bank_id: req.body.bank_id,
        password: req.body.password,
        verified: req.body.verified,
        contact_number: req.body.contact_number,
        active: req.body.active,
      })
      .then((user) => {
				const { password, ...userWithoutPassword } = user;
				return res.status(201).send(userWithoutPassword)})
      .catch((error) => res.status(400).send(error));
  }

  list(req: Request, res: Response) {
    return User
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [Role, UserAudit]
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  }

  retrieve(req: Request, res: Response) {
    return User
      .findByPk(req.params.userId, {
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
	}
	
	retrieveByRole(req: Request, res: Response) {
    return User
      .findAll({
				attributes: ['id', 'role_id', 'firstname', 'corp_email'],
				where: {
					role_id: req.params.roleId,
					active: true
				},
        include: [
					{
						model: Role,
						as: 'role'
					}
				]
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
	}

  update(req: Request, res: Response) {
    return User
      .findByPk(req.params.userId, {
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            firstname: req.body.firstname || user.firstname,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  destroy(req: Request, res: Response) {
    return User
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}