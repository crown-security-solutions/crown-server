"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app.route('/api')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.get('/api/users', this.userController.index);
        // app.post('/api/users', this.userController.create);
        // app.get('/api/users', this.userController.list);
        // app.get('/api/users/:userId', this.userController.retrieve);
        // app.get('/api/users/role/:roleId', this.userController.retrieveByRole);
        // app.put('/api/users/:userId', this.userController.update);
        // app.delete('/api/users/:userId', this.userController.destroy);               
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map