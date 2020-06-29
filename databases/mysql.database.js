require('dotenv').config()

const mysqlConnect = `mysql://${process.env.mysql_username}:${process.env.mysql_password}@${process.env.mysql_host}:${process.env.mysql_port}/${process.env.mysql_database}`
module.exports = { mysqlConnect }