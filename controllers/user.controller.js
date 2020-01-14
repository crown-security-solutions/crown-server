"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UserController {
    index(req, res) {
        user_model_1.User.findAll({})
            .then((nodes) => res.json(nodes))
            .catch((err) => res.status(500).json(err));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map