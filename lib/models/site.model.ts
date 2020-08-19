import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { SiteStrength } from "./site_strength.model";

export class Site extends Model {
  public id!: number;
  public name: string;
  public site_code: string;
  public shift: number;
  public billing_name: string;
  public gst_number: string;
  public address: string;
  public contact_person_name: string;
  public contact_number: string;
  public officer_in_charge_id: number;
  public shift_type_id: number;
  public start_date: Date;  
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
    billing_name: DataTypes.STRING,
    gst_number: DataTypes.STRING,
    address: DataTypes.STRING,
    contact_person_name: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    officer_in_charge_id: DataTypes.INTEGER,
    shift_type_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
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