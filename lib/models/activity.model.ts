import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Activity extends Model {
  public id!: number;
	public code: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Activity.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		code: DataTypes.STRING
  },
  {
    tableName: "activities",
    sequelize: database // this bit is important
  }
);

// Activity.sync({ force: true }).then(() => console.log("Activity table created"));