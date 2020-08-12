import { Request, Response } from 'express';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import { secret } from '../config/database';
import { Role } from '../models/role.model';
import { UserAudit } from '../models/user_audit.model';
import { Helper } from '../config/helper';
import { UserAuditReport } from '../models/user_audit_report.model';
import { Op, Sequelize } from 'sequelize';
import { subDays, format } from 'date-fns';
import { Site } from '../models/site.model';

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
				attributes: ['id', 'role_id', 'firstname', 'lastname', 'corp_email', 'code', [Sequelize.fn('CONCAT', Sequelize.col('firstname'), ' ', Sequelize.col('lastname')), "displayname"]],
        include: [{
					model: Role,
					as: 'role'
				}]
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
				attributes: ['id', 'role_id', 'firstname', 'lastname', 'corp_email', 'code', [Sequelize.fn('CONCAT', Sequelize.col('firstname'), ' ', Sequelize.col('lastname')), "displayname"]],
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
	
	checkCrossOt(req: Request, res: Response) {
		UserAuditReport
			.findAll({
				where: {
          // fetching yesterdays user audit report for checking night/day ot
          reporting_date: {
            [Op.between]: [
              		format(subDays(new Date(req.body.reportingDate), 1), 'yyyy-MM-dd'),
              		Helper.formatDate(req.body.reportingDate)
              	]
          }
				},
				include: [
					{
						model: UserAudit,
            as: 'user_audits',
            where: {
              user_id: +req.body.user_id
            }
          },
          {
						model: Site,
						as: 'site'
					}
				]
			})
			.then((userAuditReports: Array<any>) => {
				let user_OT_found = [];
				let user_CROSS_OT_found = [];
        let user_CROSS_OT_not_possible = [];
        let user_NIGHT_DAY_OT_found = [];
        let user_NIGHT_DAY_CROSS_OT_found = [];
        let todaysReports = userAuditReports.filter(x => format(new Date(x.reporting_date), 'yyyy-MM-dd') === Helper.formatDate(req.body.reportingDate));
        let yesterdaysReports = userAuditReports.filter(x => format(new Date(x.reporting_date), 'yyyy-MM-dd') === format(subDays(new Date(req.body.reportingDate), 1), 'yyyy-MM-dd'));
        
				todaysReports.forEach(report => {
					user_OT_found =  report.user_audits.filter(x => 
						report.shift === +req.body.shift - 1 && report.site_id === +req.body.siteId);
					user_CROSS_OT_found =  report.user_audits.filter(x => 
						report.site_id !== +req.body.siteId && report.shift === +req.body.shift - 1);
					user_CROSS_OT_not_possible =  report.user_audits.filter(x => 
						report.shift === +req.body.shift && report.site_id !== +req.body.siteId);
          });
        yesterdaysReports.forEach(report => {
          user_NIGHT_DAY_OT_found =  report.user_audits.filter(x => 
            +report.shift === 3 && +req.body.shift === 1 && report.site_id === +req.body.siteId);
          user_NIGHT_DAY_CROSS_OT_found =  report.user_audits.filter(x => 
            +report.shift === 3 && +req.body.shift === 1 && report.site_id !== +req.body.siteId);
        });
				return res.status(200).send({
					ot: user_OT_found.length, 
          cross_ot: user_CROSS_OT_found.length, 
          night_day_ot: user_NIGHT_DAY_OT_found.length,
          night_day_cross_ot: user_NIGHT_DAY_CROSS_OT_found.length,
					cross_ot_not_possible: user_CROSS_OT_not_possible.length
				});
			})
	}
}