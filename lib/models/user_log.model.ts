import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class UserLog extends Model {
  public id!: number;
	user_id: number;
	start_date: Date;
	end_date: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserLog.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		user_id: DataTypes.BIGINT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  },
  {
    tableName: "user_logs",
    sequelize: database // this bit is important
  }
);

// UserLog.sync({ force: true }).then(() => console.log("UserLog table created"));