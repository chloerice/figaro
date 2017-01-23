const Sequelize = require('sequelize')
const db = require('APP/db')

const Journal = db.define('journal', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Journal
