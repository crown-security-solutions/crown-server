"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    code: sequelize_1.DataTypes.STRING,
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: sequelize_1.DataTypes.STRING,
    corp_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.CHAR,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    adhaar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bank_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    contact_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    tableName: "users",
    sequelize: database_1.database // this bit is important
});
// User.sync({ force: true }).then(() => console.log("User table created"));
//# sourceMappingURL=user.model.js.map