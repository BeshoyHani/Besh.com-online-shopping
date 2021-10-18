const profileModel = require('../models/profile-model');
const validationResult = require('express-validator').validationResult;


exports.getProfile = (req, res, next) => {
    profileModel.getProfile(req.session.userId)
        .then(user => {
            res.render('profile', {
                user: user,
                userName: req.session.userName,
                userImage: req.session.userImage,
                isAdmin: req.session.isAdmi,
                pageTitle: 'My Profile - Besh.com',
                toastMessage: req.flash('toastMessage')
            })
        })
        .catch(err => console.log(err))
}

exports.saveName = (req, res, next) => {
    profileModel.updateUser(req.session.userId, {
        username:  req.body.username
    })
    .then(() =>{
        req.session.userName = req.body.username;
        res.redirect('/profile');
    })
    .catch(err => console.log(err))
}

exports.saveImage = (req, res, next) => {
    profileModel.updateUser(req.session.userId, {
        image:  req.file.filename
    })
    .then(() =>{
        req.session.userImage = req.file.filename;
        res.redirect('/profile');
    })
    .catch(err => console.log(err))
}