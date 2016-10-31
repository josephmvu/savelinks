var userMeta = require('./user'),
    linkMeta = require('./link'),
    db = require('../config/sequelize');
    
var User = db.define('user', userMeta.attributes, userMeta.options);
var Link = db.define('link', linkMeta.attributes, linkMeta.options);

User.hasMany(Link);

User.sync().then(() => {
    Link.sync();
});

module.exports.User = User;
module.exports.Link = Link;