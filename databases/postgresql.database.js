require('dotenv').config()

const postgresqlConnect = `postgres://${process.env.postgresql_username}:${process.env.postgresql_password}@${process.env.postgresql_host}:${process.env.postgresql_port}/${process.env.postgresql_database}`
module.exports = { postgresqlConnect }