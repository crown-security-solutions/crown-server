import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class SiteStrength extends Model {
  public id!: number;
	public site_id: number;
  public strength_count_day: number;
  public strength_count_general: number;
  public strength_count_night: number;
	public requirement_date?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SiteStrength.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		site_id: DataTypes.BIGINT,
    strength_count_day: DataTypes.INTEGER,
    strength_count_general: DataTypes.INTEGER,
    strength_count_night: DataTypes.INTEGER,
		requirement_date: DataTypes.DATE
  },
  {
    tableName: "site_strengths",
    sequelize: database // this bit is important
  }
);

// SiteStrength.sync({ force: true }).then(() => console.log("SiteStrength table created"));