const authModel = require('../models/auth-model');
const validatorResult = require('express-validator').validationResult;


exports.getSignup = (req, res, next) => {
    res.render('signup', {
        userName: req.session.userName,
        userImage: req.session.userImage,
        isAdmin: false,
        validationErrors: req.flash('signUpValidationErrors'),
        pageTitle: 'Signip - Besh.com',
        toastMessage: req.flash('toastMessage')
    });
}

exports.postSignup = (req, res, next) => {
    if (validatorResult(req).isEmpty()) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect('/login'))
            .catch(err => res.redirect('/signup'));
    } else {
        req.flash('signUpValidationErrors', validatorResult(req).array());
        res.redirect('signup');
    }
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('loginValidationErrors'),
        userName: req.session.userName,
        userImage: req.session.userImage,
        userEmail: req.session.userEmail,
        pageTitle: 'Login - Besh.com',
        isAdmin: false,
        toastMessage: req.flash('toastMessage')
    });
}

exports.postLogin = (req, res, next) => {
    if (validatorResult(req).isEmpty()) {
        authModel.login(req.body.email, req.body.password)
            .then(userData => {
                req.session.userId = userData.userId;
                req.session.userName = userData.userName;
                req.session.isAdmin = userData.isAdmin;
                req.session.userEmail = userData.userEmail;
                req.session.userImage = userData.userImage;
                res.redirect('/');
            })
            .catch(err => {
                req.flash('authError', err);
                res.redirect('/login');
            })
    }else {
        req.flash('loginValidationErrors', validatorResult(req).array());
        res.redirect('login');
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}