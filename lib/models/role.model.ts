import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Role extends Model {
	public id!: number;
	public name!: string;
	public code!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		name: DataTypes.STRING,
		code: DataTypes.STRING
  },
  {
    tableName: "roles",
    sequelize: database // this bit is important
  }
);

// Role.sync({ force: true }).then(() => console.log("Role table created"));