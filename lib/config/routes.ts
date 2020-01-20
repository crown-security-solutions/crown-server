import {Request, Response} from "express";
import { UserController } from "../controllers/user.controller";
import { SiteController } from "../controllers/site.controller";
import { RoleController } from "../controllers/role.controller";
import { UserAuditReportController } from "../controllers/user_audit_report.controller";

export class Routes {  
	public userController: UserController = new UserController();
	public siteController: SiteController = new SiteController();
	public roleController: RoleController = new RoleController();
	public userAuditReportController: UserAuditReportController = new UserAuditReportController();

	public routes(app): void {          
			app.route('/api')
			.get((req: Request, res: Response) => {            
					res.status(200).send({
							message: 'GET request successfulll!!!!'
					})
			})

		app.post('/api/users/authenticate', this.userController.authenticate);
		app.post('/api/users', this.userController.create);
		app.get('/api/users', this.userController.list);
		app.get('/api/users/:userId', this.userController.retrieve);
		app.get('/api/users/role/:roleId', this.userController.retrieveByRole);
		app.put('/api/users/:userId', this.userController.update);
		app.delete('/api/users/:userId', this.userController.destroy);
		
		// sites API
		app.post('/api/sites', this.siteController.create);
		app.get('/api/sites', this.siteController.list);
		app.get('/api/sites/:siteId', this.siteController.retrieve);
		app.put('/api/sites/:siteId', this.siteController.update);
		app.delete('/api/sites/:siteId', this.siteController.destroy);
	
		// roles API
		app.post('/api/roles', this.roleController.create);
		app.get('/api/roles', this.roleController.list);
		app.get('/api/roles/:roleId', this.roleController.retrieve);
		app.put('/api/roles/:roleId', this.roleController.update);
		app.delete('/api/roles/:roleId', this.roleController.destroy);
		
		// user_audit_reports API
		app.post('/api/reports', this.userAuditReportController.create);
		app.get('/api/reports', this.userAuditReportController.list);
		app.get('/api/reports/:userAuditReportId', this.userAuditReportController.retrieve);
		app.put('/api/reports/:userAuditReportId', this.userAuditReportController.update);
		app.delete('/api/reports/:userAuditReportId', this.userAuditReportController.destroy);
		app.post('/api/reports/find-report', this.userAuditReportController.find);
	}
}