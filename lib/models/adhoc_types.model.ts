import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class AdhocType extends Model {
	public id!: number;
	public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdhocType.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		name: DataTypes.STRING
  },
  {
    tableName: "adhoc_types",
    sequelize: database // this bit is important
  }
);

// AdhocType.sync({ force: true }).then(() => console.log("AdhocType table created"));