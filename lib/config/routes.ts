import {Request, Response} from "express";
import { UserController } from "../controllers/user.controller";

export class Routes {  
	public userController: UserController = new UserController();

	public routes(app): void {          
			app.route('/api')
			.get((req: Request, res: Response) => {            
					res.status(200).send({
							message: 'GET request successfulll!!!!'
					})
			})
		app.get('/api/users', this.userController.index);
		// app.post('/api/users', this.userController.create);
		// app.get('/api/users', this.userController.list);
		// app.get('/api/users/:userId', this.userController.retrieve);
		// app.get('/api/users/role/:roleId', this.userController.retrieveByRole);
		// app.put('/api/users/:userId', this.userController.update);
		// app.delete('/api/users/:userId', this.userController.destroy);               
	}
}