import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { Role } from "./role.model";
import { UserAudit } from "./user_audit.model";

export class User extends Model {
  public id!: number;
  public role_id!: number;
	public code: string;
  public firstname!: string;
  public middlename!: string;
	public lastname!: string;
	public email: string;
	public corp_email!: string;
	public dob!: string;
	public gender!: string;
	public address!: string;
	public pan!: string;
  public adhaar!: string;
  public adhaar_name!: string;
	public bank_id: number;
	public password!: string;
	public verified!: boolean;
  public contact_number!: string;
  public alternate_contact_number!: string;
  public linked_site_code!: string;
  public start_date!: string;
  public end_date!: string;
	public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		role_id: DataTypes.STRING,
		code: DataTypes.STRING,
		firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
		lastname: DataTypes.STRING,
		email: DataTypes.STRING,
		corp_email: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    pan: DataTypes.STRING,
    adhaar: DataTypes.STRING,
    adhaar_name: DataTypes.STRING,
    bank_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    contact_number: DataTypes.STRING,
    alternate_contact_number: DataTypes.STRING,
    linked_site_code: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    tableName: "users",
    sequelize: database // this bit is important
  }
);

User.hasOne(Role, {
	foreignKey: 'id',
	sourceKey: 'role_id',
	as: 'role'
});

// User.sync({ force: true }).then(() => console.log("User table created"));