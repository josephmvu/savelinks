var Sequelize = require('sequelize');

var attributes = {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    },
    list: {
        type: Sequelize.STRING,
    }
};

var options = {

};

module.exports.attributes = attributes;
module.exports.options = options;