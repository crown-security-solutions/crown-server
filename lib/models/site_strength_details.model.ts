import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class SiteStrengthDetails extends Model {
  public id!: number;
  public site_strength_id: number;
  public role_id: number;
  public strength_count: number;
  public shift_type_id: number;
  public shift: number;
  public bill_rate: number;
  public wage_rate: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SiteStrengthDetails.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
    site_strength_id: DataTypes.BIGINT,
    role_id: DataTypes.BIGINT,
    strength_count: DataTypes.INTEGER,
    shift_type_id: DataTypes.INTEGER,
    shift: DataTypes.INTEGER,
    bill_rate: DataTypes.BIGINT,
    wage_rate: DataTypes.BIGINT
  },
  {
    tableName: "site_strength_details",
    sequelize: database // this bit is important
  }
);

// SiteStrengthDetails.sync({ force: true }).then(() => console.log("SiteStrength table created"));