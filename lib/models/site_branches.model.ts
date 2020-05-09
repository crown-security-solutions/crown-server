import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { SiteStrength } from "./site_strength.model";

export class SiteBranches extends Model {
  public id!: number;
	public name: string;
	public address: string;
	public contact: string;
	public contact_person: string;
	public shift: number;
	public active: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SiteBranches.init(
  {
		id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		name: DataTypes.STRING,
		code: DataTypes.STRING,
		location: DataTypes.STRING,
		zone: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
		contact_person: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },
  {
    tableName: "site_branches",
    sequelize: database // this bit is important
  }
);

SiteBranches.hasMany(SiteStrength, {
	foreignKey: 'site_id',
	sourceKey: 'id',
	as: 'sites_with_branches'
});

// Site.sync({ force: true }).then(() => console.log("Site table created"));