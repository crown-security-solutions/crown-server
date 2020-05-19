import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { UserAudit } from "./user_audit.model";
import { Site } from "./site.model";
import { format, parseISO } from 'date-fns';

export class UserAuditReport extends Model {
  public id!: number;
	public reporting_date: Date;
	public site_id: number;
	public shift: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserAuditReport.init(
  {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		reporting_date: DataTypes.DATEONLY,
		site_id: DataTypes.INTEGER,
		shift: DataTypes.INTEGER
  },
  {
    tableName: "user_audit_reports",
    sequelize: database // this bit is important
  }
);

UserAuditReport.hasMany(UserAudit, {
	foreignKey: 'audit_report_id',
	sourceKey: 'id',
	as: 'user_audits',
	onDelete: 'CASCADE',
	hooks: true
});

UserAuditReport.hasMany(UserAudit, {
	foreignKey: 'audit_report_id',
	sourceKey: 'id',
	onDelete: 'CASCADE',
	hooks: true
});

UserAudit.belongsTo(UserAuditReport, {
	foreignKey: 'audit_report_id',
	targetKey: 'id'
});

UserAuditReport.hasOne(Site, {
	foreignKey: 'id',
	sourceKey: 'site_id',
	as: 'site'
});

// UserAuditReport.sync({ force: true }).then(() => console.log("UserAuditReport table created"));