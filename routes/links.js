var express = require('express'),
    router = express.Router(),
    Models = require('../models');

router.get('/dashboard', isLoggedIn, (req, res, next) => {
    Models.Link.findAll({ 
        where: { userId: req.user.id }, 
        order: [ [ 'id', 'DESC'] ] 
    })
    .then((links) => {
        res.render('dashboard', {
            user: req.user,
            links: links
        });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.post('/dashboard/links', isLoggedIn, (req, res, next) => {
    Models.Link.create({
        title: req.body.title,
        url: req.body.url,
        list: req.body.list,
        userId: req.user.id
    })
    .then((link) => {
        res.redirect('/dashboard');
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get('/dashboard/new', isLoggedIn, (req, res, next) => {
    res.render('links/new', {
        user: req.user
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}