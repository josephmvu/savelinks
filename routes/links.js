var express = require('express'),
    router = express.Router(),
    Models = require('../models');

router.get('/', isLoggedIn, (req, res, next) => {
    Models.Link.findAll({ 
        where: { userId: req.user.id }, 
        order: [ [ 'id', 'DESC'] ] 
    }).then((links) => {
        res.render('dashboard', {
            user: req.user,
            links: links
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.post('/', isLoggedIn, (req, res, next) => {
    Models.Link.create({
        title: req.body.title,
        url: req.body.url,
        list: req.body.list,
        userId: req.user.id
    }).then((link) => {
        res.redirect('/dashboard');
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('links/new', {
        user: req.user
    });
});

router.get('/:id/edit', isLoggedIn, (req, res, next) => {
    Models.Link.findOne({
        where: {
            userId: req.user.id,
            id: req.params.id
        }
    }).then((link) => {
        res.render('links/edit', {
            user: req.user,
            link: link
        });
    });
});

router.put('/:id', isLoggedIn, (req, res, next) => {
    Models.Link.findOne({
        where: {
            userId: req.user.id,
            id: req.params.id
        }
    }).then((link) => {
        link.title = req.body.title;
        link.url = req.body.url;
        link.list = req.body.list;
        link.save().then(() => {
            res.redirect('/dashboard');
        }).catch((err) => {
            res.json(err);
        });
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:id', isLoggedIn, (req, res, next) => {
    Models.Link.destroy({
        where: {
            userId: req.user.id,
            id: req.params.id
        }
    }).then(() => {
        console.log('Link deleted');
        res.redirect('/dashboard');
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}