import { Sequelize } from "sequelize";

export const database = new Sequelize({
  username: "IKD3y9ntxb",
	password: "h9u21TC9JK",
	database: "IKD3y9ntxb",
	host: "remotemysql.com",
	port: 3306,
	dialect: "mysql"
});

export const secret = "Crown security Secret";