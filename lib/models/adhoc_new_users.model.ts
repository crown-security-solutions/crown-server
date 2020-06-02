import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { Role } from "./role.model";
import { UserAudit } from "./user_audit.model";

export class AdhocNewUser extends Model {
  public id!: number;
  public role_id!: number;
	public code: string;
  public firstname!: string;
  public middlename!: string;
	public lastname!: string;
	public dob!: Date;
	public gender!: string;
	public address!: string;
	public pan!: string;
	public adhaar!: string;
	public password!: string;
	public verified!: boolean;
  public contact_number!: string;
  public alternate_contact_number!: string;
	public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdhocNewUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		role_id: {
      type: DataTypes.STRING
    },
		code: DataTypes.STRING,
		firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middlename: {
      type: DataTypes.STRING
    },
		lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    pan: {
      type: DataTypes.STRING
    },
    adhaar: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alternate_contact_number: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    tableName: "adhoc_new_users",
    sequelize: database // this bit is important
  }
);

AdhocNewUser.hasOne(Role, {
	foreignKey: 'id',
	sourceKey: 'role_id',
	as: 'role'
});

// AdhocNewUser.sync({ force: true }).then(() => console.log("AdhocNewUser table created"));