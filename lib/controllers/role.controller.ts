import { Request, Response } from 'express';
import { Role } from '../models/role.model';

export class RoleController{
	create(req: Request, res: Response) {
    return Role
      .create({
        name: req.body.name,
        code: req.body.code
      })
      .then((role) => res.status(201).send(role))
      .catch((error) => res.status(400).send(error));
  }

  list(req: Request, res: Response) {
    return Role
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ]
      })
      .then((roles) => res.status(200).send(roles))
      .catch((error) => res.status(400).send(error));
  }

  retrieve(req: Request, res: Response) {
    return Role
      .findByPk(req.params.roleId, {
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send(role);
      })
      .catch((error) => res.status(400).send(error));
  }

  update(req: Request, res: Response) {
    return Role
      .findByPk(req.params.roleId, {
      })
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update({
          })
          .then(() => res.status(200).send(role))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  destroy(req: Request, res: Response) {
    return Role
      .findByPk(req.params.roleId)
      .then(role => {
        if (!role) {
          return res.status(400).send({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}