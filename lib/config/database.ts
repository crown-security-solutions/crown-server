import { Sequelize } from "sequelize";

export const database = new Sequelize({
  username: "crowntcw_amin",
	password: "Amin@8102",
	database: "crowntcw_admin",
	host: "crownsecuritysolutions.com",
	port: 3306,
	dialect: "mysql"
});

export const secret = "Crown security Secret";