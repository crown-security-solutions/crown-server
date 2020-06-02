import { Request, Response } from 'express';
import { AdhocType } from '../models/adhoc_types.model';
import { AdhocNewUser } from '../models/adhoc_new_users.model';
import { Role } from '../models/role.model';

export class AdhocController{
	create(req: Request, res: Response) {
    return AdhocType
      .create({
        name: req.body.name,
      })
      .then((type) => res.status(201).send(type))
      .catch((error) => res.status(400).send(error));
  }

  createUser(req: Request, res: Response) {
    return AdhocNewUser
      .create(req.body)
      .then((type) => res.status(201).send(type))
      .catch((error) => res.status(400).send(error));
  }

  list(req: Request, res: Response) {
    return AdhocType
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ]
      })
      .then((types) => res.status(200).send(types))
      .catch((error) => res.status(400).send(error));
  }

  listUsers(req: Request, res: Response) {
    return AdhocNewUser
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [
					{
						model: Role,
						as: 'role'
					}
				]
      })
      .then((types) => res.status(200).send(types))
      .catch((error) => res.status(400).send(error));
  }

  retrieve(req: Request, res: Response) {
    return AdhocType
      .findByPk(req.params.adhocTypeId, {
      })
      .then((type) => {
        if (!type) {
          return res.status(404).send({
            message: 'Adhoc Type Not Found',
          });
        }
        return res.status(200).send(type);
      })
      .catch((error) => res.status(400).send(error));
  }

  update(req: Request, res: Response) {
    return AdhocType
      .findByPk(req.params.adhocTypeId, {
      })
      .then(type => {
        if (!type) {
          return res.status(404).send({
            message: 'Adhoc Type Not Found',
          });
        }
        return type
          .update({
          })
          .then(() => res.status(200).send(type))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  updateUser(req: Request, res: Response) {
    return AdhocNewUser
      .findByPk(req.body.id, {
      })
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'Adhoc User Not Found',
          });
        }
        return user
          .update(req.body)
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  destroy(req: Request, res: Response) {
    return AdhocType
      .findByPk(req.params.adhocTypeId)
      .then(type => {
        if (!type) {
          return res.status(400).send({
            message: 'Adhoc Type Not Found',
          });
        }
        return type
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  destroyUser(req: Request, res: Response) {
    return AdhocNewUser
      .findByPk(req.body.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'Adhoc User Not Found',
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