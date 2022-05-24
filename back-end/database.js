'use strict';
const Sequelize = require('sequelize')

const db = {}

const sequelize = new Sequelize( 
  process.env.DB_NAME,  
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorsAliases: 0,
})

let models = [
    require('./models/todos.js')
]

// Khởi tạo models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize

module.exports = db