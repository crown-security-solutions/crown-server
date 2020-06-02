import { Sequelize } from "sequelize";

export const database = new Sequelize(
	// {
	// 	username: "crowntcw_amin",
	// 	password: "Amin@8102",
	// 	database: "crowntcw_admin",
	// 	host: "crownsecuritysolutions.com",
	// 	port: 3306,
	// 	dialect: "mysql"
	// },
	{
		username: "IKD3y9ntxb",
		password: "h9u21TC9JK",
		database: "IKD3y9ntxb",
		host: "remotemysql.com",
		port: 3306,
		dialect: "mysql"
	}
);

export const secret = "Crown security Secret";