const sequelize = require('sequelize');

require('dotenv').config();

let postgresqlConfig = require('../../databases/postgresql.database');
const postgresqlSequelize = new sequelize(postgresqlConfig.postgresqlConnect);

const postgresqlDataSchema = postgresqlSequelize.define('USER', {
	userId: {
		field: 'USER_ID',
		type: sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		field: 'NAME',
		type: sequelize.STRING,
		allowNull: false
	},
	email: {
		field: 'EMAIL',
		type: sequelize.STRING,
		allowNull: false
	},
	role: {
		field: 'ROLE',
		type: sequelize.STRING,
		allowNull: false
	},
	createdAt: {
		field: 'CREATED_DATE',
		type: sequelize.DATE
	},
	updatedAt: {
		field: 'UPDATED_DATE',
		type: sequelize.DATE
	}
}, {
	timestamps: true,
	freezeTableName: true
});

module.exports = postgresqlDataSchema;