var userMeta = require('./user'),
    db = require('../config/sequelize');
    
var User = db.define('users', userMeta.attributes, userMeta.options);

User.sync();

module.exports.User = User;