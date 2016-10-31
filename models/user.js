var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt-nodejs');

var attributes = {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    }, 
    password: {
        type: Sequelize.STRING
    }
};

var options = {
    freezeTableName: false,
    hooks: {
        beforeCreate: (user) => {
            console.log('Hashing password');
            user.password = bcrypt.hashSync(user.password);
        },
        afterCreate: (user) => {
            console.log('User created');
            console.log(user.dataValues);
        }
    },
    instanceMethods: {
        checkPassword: (password, userPassword, cb) => {
            return bcrypt.compare(password, userPassword, (err, res) => {
                cb(err, res);
            });
        }
    }
};

module.exports.attributes = attributes;
module.exports.options = options;