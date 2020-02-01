import { Request, Response } from 'express';
import { UserAudit } from '../models/user_audit.model';
import { UserAuditReport } from '../models/user_audit_report.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { startOfDay, endOfDay} from 'date-fns';
import { Op } from 'sequelize';

export class UserAuditReportController{
	create(req: Request, res: Response) {
		if (req.body.userAuditReportId) {
			UserAuditReport
			.findOne({
				where: {
					id: req.body.userAuditReportId
				},
				include: [
					{
						model: UserAudit,
						as: 'user_audits'
					}
				]
			}).then((userAuditReport) => {
				if (userAuditReport === null) {
					console.log('Not found!');
				} else {
					userAuditReport.destroy();
				}
			});
		}
		return UserAuditReport
			.create({
				reporting_date: startOfDay(new Date(req.body.reportingDate)),
				site_id: req.body.siteId,
				shift: req.body.shift,
				user_audits: req.body.user_audits
			}, {
				include: [
					{ model: UserAudit, 
						as: 'user_audits' 
					}
				]
			})
			.then((userAuditReport) => res.status(201).send(userAuditReport))
			.catch((error) => res.status(400).send(error));
	}

	list(req: Request, res: Response) {
		return UserAuditReport
			.findAll({
				order: [
					['createdAt', 'DESC'],
				],
			})
			.then((userAuditReports) => res.status(200).send(userAuditReports))
			.catch((error) => res.status(400).send(error));
	}

	retrieve(req: Request, res: Response) {
		return UserAuditReport
			.findByPk(req.params.userAuditReportId, {
			})
			.then((userAuditReport) => {
				if (!userAuditReport) {
					return res.status(404).send({
						message: 'UserAuditReport Not Found',
					});
				}
				return res.status(200).send(userAuditReport);
			})
			.catch((error) => res.status(400).send(error));
	}

	find(req: Request, res: Response) {
		return UserAuditReport
			.findOne({
				where: {
					reporting_date: {
						[Op.between]: [
							startOfDay(new Date(req.body.reportingDate)),
							endOfDay(new Date(req.body.reportingDate))
						]
					},
					site_id: req.body.siteId,
					shift: req.body.shift
				},
				include: [
					{
						model: UserAudit,
						as: 'user_audits',
						include: [
							{
								attributes: ['id', 'role_id', 'firstname', 'corp_email', 'code'],
								model: User,
								as: 'user',
								include: [
									{ 
										model: Role,
										as: 'role'
									}
								]
							},
							{ 
								model: Role,
								as: 'assigned_role'
							}
						]
					}
				]
			})
			.then((userAuditReport) => {
				// if (!userAuditReport) {
				// 	return res.status(404).send({
				// 		message: 'UserAuditReport Not Found',
				// 	});
				// }
				return res.status(200).send({
					...{ userAuditReport },
					...{
						disableForm: userAuditReport ? !(userAuditReport.reporting_date.toDateString() === startOfDay(new Date(req.body.userTodayDate)).toDateString()) : !(startOfDay(new Date(req.body.reportingDate)).toDateString() === startOfDay(new Date(req.body.userTodayDate)).toDateString())
					}
				});
			})
			.catch((error) => res.status(400).send(error));
	}

	update(req: Request, res: Response) {
		return UserAuditReport
			.findByPk(req.params.userAuditReportId, {
			})
			.then(userAuditReport => {
				if (!userAuditReport) {
					return res.status(404).send({
						message: 'UserAuditReport Not Found',
					});
				}
				return userAuditReport
					.update({
					})
					.then(() => res.status(200).send(userAuditReport))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	}

	destroy(req: Request, res: Response) {
		return UserAuditReport
			.findByPk(req.params.userAuditReportId)
			.then(userAuditReport => {
				if (!userAuditReport) {
					return res.status(400).send({
						message: 'UserAuditReport Not Found',
					});
				}
				return userAuditReport
					.destroy()
					.then(() => res.status(204).send())
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	}
}