import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class RoleActivity extends Model {
  public id!: number;
	public role_id: number;
	public activity_id: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoleActivity.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		role_id: DataTypes.INTEGER,
    activity_id: DataTypes.INTEGER
  },
  {
    tableName: "role_activities",
    sequelize: database // this bit is important
  }
);

// RoleActivity.sync({ force: true }).then(() => console.log("RoleActivity table created"));