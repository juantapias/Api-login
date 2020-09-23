const Sequelize = require('sequelize')

const UsersModel = require('../models/users')

const dbConect = new Sequelize('api-rest', 'root', 'root', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql'
})

const User = UsersModel(dbConect, Sequelize)

dbConect.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas')
  })

module.exports = {
  User
}