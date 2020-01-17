import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { UserAuditReport } from "./user_audit_report.model";
import { User } from "./user.model";

export class UserAudit extends Model {
  public id!: number;
	audit_report_id: number;
	user_id: number;
	attendance: boolean;
	ot: boolean;
	cross_ot: boolean;
	grooming_failure: boolean;
	beard: boolean;
	uniform: boolean;
	shoes: boolean;
	socks: boolean;
	accessories: boolean;
	hair_cut: boolean;
	idf: boolean;
	comments: string;
	adhoc: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserAudit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
		},
		audit_report_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    attendance: DataTypes.BOOLEAN,
    ot: DataTypes.BOOLEAN,
    cross_ot: DataTypes.BOOLEAN,
    grooming_failure: DataTypes.BOOLEAN,
    beard: DataTypes.BOOLEAN,
    uniform: DataTypes.BOOLEAN,
    shoes: DataTypes.BOOLEAN,
    socks: DataTypes.BOOLEAN,
    accessories: DataTypes.BOOLEAN,
    hair_cut: DataTypes.BOOLEAN,
    idf: DataTypes.BOOLEAN,
    comments: DataTypes.TEXT,
    adhoc: DataTypes.BOOLEAN,
  },
  {
    tableName: "user_audits",
    sequelize: database // this bit is important
  }
);

UserAudit.belongsTo(UserAuditReport, {
	foreignKey: 'audit_report_id',
	targetKey: 'id',
	as: 'UA_BT_UAR'
});

UserAudit.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'id',
	as: 'UA_BT_User'
});

// UserAudit.sync({ force: true }).then(() => console.log("UserAudit table created"));