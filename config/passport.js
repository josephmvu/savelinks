var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('../models');
    
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Models.User.findOne({
        where: { id: id }
    }).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, null);
    });
});

// local signup strategy
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', // change default (username) to email
    passReqToCallback: true
}, (req, email, password, done) => {
    email = email.toLowerCase();
    Models.User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (user) {
            // email address is already taken - return
            done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
            // register new user
            Models.User.create({
                email: email,
                password: password
            }).then((newUser) => {
                done(null, newUser);
            }).catch((err) => {
                done(err, false, req.flash('signupMessage', 'Unexpected error. Try again.'));
            });
        }
    }).catch((err) => {
        done(err, false, req.flash('signupMessage', 'Unexpected error. Try again.'));
    });
}));

// local login strategy
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // change default (username) to email
    passReqToCallback: true
}, (req, email, password, done) => {
    email = email.toLowerCase();
    Models.User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        // if user does not exist, return
        if (!user) {
            return done(null, false, req.flash('loginMessage', 'That email does not exist.'));
        }
        
        // user found - check if valid password
        user.checkPassword(password, user.password, function(err, valid) {
            if (err) {
                return done(err, false, req.flash('loginMessage', 'Error checking your password.'));
            }
            if (valid) {
                return done(null, user);
            }
            done(null, false, req.flash('loginMessage', 'Incorrect password.'));
        });
        
    });
}));