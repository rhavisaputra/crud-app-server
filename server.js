const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const sequelize = require('sequelize')

require('dotenv').config()

// Databases
let mysqlConfig = require('./databases/mysql.database')
let postgresqlConfig = require('./databases/postgresql.database')

// Express Route
let postgresqlDataRoute = require('./routes/postgresql/user.route')
let mysqlDataRoute = require('./routes/mysql/user.route')

// Connect to Mysql Database
const mysqlSequelize = new sequelize(mysqlConfig.mysqlConnect)
mysqlSequelize
    .authenticate()
    .then(() => {
        console.log('> Successfully connect to Mysql database.')
    })
    .catch(err => {
        console.error('> Unable to connect Mysql database:', err)
    })

// Connect to Postgresql Database
const postgresqlSequelize = new sequelize(postgresqlConfig.postgresqlConnect)
postgresqlSequelize
    .authenticate()
    .then(() => {
        console.log('> Successfully connect to Postgresql database.')
    })
    .catch(err => {
        console.error('> Unable to connect Postgresql database:', err)
    })

// Sync
const UserMysql = require('./models/mysql/user.model')
const UserPostgresql = require('./models/postgresql/user.model')

UserMysql
    .sync()
    .then(() => {
        console.log('> Successfully Sync to UserMysql.')
    })
    .catch(err => {
        console.error('> Unable to Sync UserMysql:', err)
    })

UserPostgresql
    .sync()
    .then(() => {
        console.log('> Successfully Sync to UserPostgresql.')
    })
    .catch(err => {
        console.error('> Unable to Sync UserPostgresql:', err)
    })

const app = express()
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => res.send('This is Route'))
app.use('/mysql', mysqlDataRoute)
app.use('/postgresql', postgresqlDataRoute)

// 404 Error
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// PORT
const port = process.env.server_port || 3000

// Server
app.listen(port, () => console.log(`Server listening on port ${port}!`))