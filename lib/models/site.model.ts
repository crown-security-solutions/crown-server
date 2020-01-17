import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { SiteStrength } from "./site_strength.model";

export class Site extends Model {
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

Site.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
		contact_person: DataTypes.STRING,
		shift: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  },
  {
    tableName: "sites",
    sequelize: database // this bit is important
  }
);

Site.hasMany(SiteStrength, {
	foreignKey: 'id',
	sourceKey: 'site_id',
	as: 'site_HM_SiteStrength'
});

// Site.sync({ force: true }).then(() => console.log("Site table created"));