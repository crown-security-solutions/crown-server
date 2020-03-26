import { Sequelize } from "sequelize";

export const database = new Sequelize({
  username: "KjFPObnKzN",
	password: "KjFboFQ04Q",
	database: "KjFPObnKzN",
	host: "remotemysql.com",
	port: 3306,
	dialect: "mysql"
});

export const secret = "Crown security Secret";