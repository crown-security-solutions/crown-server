import { Request, Response } from 'express';
import { UserAudit } from '../models/user_audit.model';
import { UserAuditReport } from '../models/user_audit_report.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { startOfDay, endOfDay} from 'date-fns';
import { Op, Sequelize } from 'sequelize';
import { Site } from '../models/site.model';
import { head, range } from 'lodash';

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
							startOfDay(new Date(req.body.reportingDate)).toISOString(),
							endOfDay(new Date(req.body.reportingDate)).toISOString()
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
								attributes: ['id', 'role_id', 'firstname', 'lastname', 'corp_email', 'code', [Sequelize.fn('CONCAT', Sequelize.col('firstname'), ' ', Sequelize.col('lastname')), "displayname"]],
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

	filterList(req: Request, res: Response) {
		return UserAuditReport
			.findAll({
				where: {
					reporting_date: {
						[Op.between]: [
							startOfDay(new Date(req.body.startDate)).toISOString(),
							endOfDay(new Date(req.body.endDate)).toISOString()
						]
					}
				},
				include: [
					{
						model: UserAudit,
						as: 'user_audits',
						include: [
							{
								attributes: ['id', 'role_id', 'firstname', 'lastname', 'corp_email', 'code', [Sequelize.fn('CONCAT', Sequelize.col('firstname'), ' ', Sequelize.col('lastname')), "displayname"]],
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
					},
					{
						model: Site,
						as: 'site'
					}
				]
			})
			.then((userAuditReports) => {
				// if (!userAuditReport) {
				// 	return res.status(404).send({
				// 		message: 'UserAuditReport Not Found',
				// 	});
				// }
				let result = [];
				const distinctReportDates = [... new Set(userAuditReports.map(x => x.reporting_date.toISOString()))];
				const distinctSites = [... new Set(userAuditReports.map(x => +x.site_id))];
				const maxShift = Math.max(...[... new Set(userAuditReports.map(x => +x.shift))]);
				distinctReportDates.forEach(a => {
					distinctSites.forEach(x => {
						const siteWiseReports = userAuditReports.filter(y => +y.site_id === x && y.reporting_date.toISOString() === a);
						const reportResultObject = {}
						if(siteWiseReports.length) {
							reportResultObject['reporting_date'] = a;
							const firstSiteWiseReport: any = head(siteWiseReports);
							reportResultObject['site_name'] = firstSiteWiseReport.site.name;
							reportResultObject['branch_name'] = firstSiteWiseReport.site.branch_name;
							reportResultObject['zone'] = firstSiteWiseReport.site.zone;
						}
						let lastShift = 1;
						//calculating ots, cross ots etc for each site date wise
						siteWiseReports.forEach((z: any) => {
							reportResultObject['ot_s' + z.shift] = z.user_audits.filter(b => b.ot).length;
							reportResultObject['cross_ot_s' + z.shift] = z.user_audits.filter(b => b.cross_ot).length;
							reportResultObject['grooming_failure_s' + z.shift] = z.user_audits.filter(b => b.grooming_failure).length;
							reportResultObject['idf_s' + z.shift] = z.user_audits.filter(b => b.idf).length;
							lastShift = z.shift;
						});
						//filling up redundant zeros if site have less shift than max shifts
						if(lastShift < maxShift) {
							range(lastShift + 1, maxShift + 1).forEach(e => {
								reportResultObject['ot_s' + e] = 0;
								reportResultObject['cross_ot_s' + e] = 0;
								reportResultObject['grooming_failure_s' + e] = 0;
								reportResultObject['idf_s' + e] = 0;
							});
						}
						// if report is not empty then push
						if (reportResultObject['reporting_date'] !== undefined) {
							result.push(reportResultObject);
						}
					});
				});
				return res.status(200).send({
					...{ result, maxShift },
				});
			})
			.catch((error) => res.status(400).send(error));
	}
}