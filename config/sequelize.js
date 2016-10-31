var Sequelize = require('sequelize'),
    secrets = require('./secrets');

var sequelize = new Sequelize(secrets.db);

module.exports = sequelize;