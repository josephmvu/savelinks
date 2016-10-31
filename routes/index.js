var express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        user: req.user,
        signupMessage: req.flash('signupMessage')
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user,
        loginMessage: req.flash('loginMessage')
    });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;