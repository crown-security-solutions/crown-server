import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { Role } from "./role.model";
import { UserAudit } from "./user_audit.model";

export class User extends Model {
  public id!: number;
  public role_id!: number;
	public code: string;
	public firstname!: string;
	public lastname!: string;
	public email: string;
	public corp_email!: string;
	public dob!: Date;
	public gender!: string;
	public address!: string;
	public pan!: string;
	public adhaar!: string;
	public bank_id: number;
	public password!: string;
	public verified!: boolean;
	public contact_number!: string;
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
		role_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
		code: DataTypes.STRING,
		firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
		lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
		email: DataTypes.STRING,
		corp_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adhaar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
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