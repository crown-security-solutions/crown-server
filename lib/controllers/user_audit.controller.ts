import { Request, Response } from 'express';
import { UserAudit } from '../models/user_audit.model';

export class UserAuditController{
	create(req: Request, res: Response) {
    return UserAudit
      .create({
				audit_report_id: req.body.audit_report_id,
				user_id: req.body.user_id,
				attendance: req.body.attendance,
				ot: req.body.ot,
				cross_ot: req.body.cross_ot,
				grooming_failure: req.body.grooming_failure,
				beard: req.body.beard,
				uniform: req.body.uniform,
				shoes: req.body.shoes,
				socks: req.body.socks,
				accessories: req.body.accessories,
				hair_cut: req.body.hair_cut,
				idf: req.body.idf,
				comments: req.body.comments,
				adhoc: req.body.adhoc,
      })
      .then((user_audit) => res.status(201).send(user_audit))
      .catch((error) => res.status(400).send(error));
  }

  list(req: Request, res: Response) {
    return UserAudit
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ]
      })
      .then((user_audits) => res.status(200).send(user_audits))
      .catch((error) => res.status(400).send(error));
  }

  retrieve(req: Request, res: Response) {
    return UserAudit
      .findByPk(req.params.user_auditId, {
      })
      .then((user_audit) => {
        if (!user_audit) {
          return res.status(404).send({
            message: 'UserAudit Not Found',
          });
        }
        return res.status(200).send(user_audit);
      })
      .catch((error) => res.status(400).send(error));
  }

  update(req: Request, res: Response) {
    return UserAudit
      .findByPk(req.params.user_auditId, {
      })
      .then(user_audit => {
        if (!user_audit) {
          return res.status(404).send({
            message: 'UserAudit Not Found',
          });
        }
        return user_audit
          .update({
          })
          .then(() => res.status(200).send(user_audit))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  destroy(req: Request, res: Response) {
    return UserAudit
      .findByPk(req.params.user_auditId)
      .then(user_audit => {
        if (!user_audit) {
          return res.status(400).send({
            message: 'UserAudit Not Found',
          });
        }
        return user_audit
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}