import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class SiteLog extends Model {
  public id!: number;
	public site_id: number;
	public start_date: Date;
	public end_date: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SiteLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		site_id: DataTypes.BIGINT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  },
  {
    tableName: "site_logs",
    sequelize: database // this bit is important
  }
);

// SiteLog.sync({ force: true }).then(() => console.log("SiteLog table created"));