import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { SiteStrength } from "./site_strength.model";

export class Site extends Model {
  public id!: number;
  public name: string;
  public site_code: string;
	public shift: number;
	public active: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Site.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
    name: DataTypes.STRING,
    site_code: DataTypes.STRING,
		shift: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  },
  {
    tableName: "sites",
    sequelize: database // this bit is important
  }
);

Site.hasMany(SiteStrength, {
	foreignKey: 'site_id',
	sourceKey: 'id',
	as: 'site_strengths'
});

// Site.sync({ force: true }).then(() => console.log("Site table created"));