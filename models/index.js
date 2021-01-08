'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// Environment type
const env = process.env.NODE_ENV || 'development';
// Config file's information to connect to the db
const config = require(__dirname + '/../config/config.json')[env];
const db = {}

let sequelize;
if (config.use_env_variable) {
  // User env variable to configure sequelize (for example process.env.ENV_VARIABLE)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // In dev environment it's used this in normal condition by reading by the file information
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// This code is autogenerated by Sequelize to associate automatically
// his table and save the models in db variable
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync models with the database
// By using:
// - alter: true, you'll create just the new table (if it's added a column won't be updated)
// - force: true, you'll create all table from zero (you'll lose all the database content)
sequelize.sync({ alter: true }).then(() => {
  console.log(`Server connected to the database!`);
}).catch((err) => {
  console.log(err);
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db variable with the information
// of the db tables and configuration
module.exports = db;
