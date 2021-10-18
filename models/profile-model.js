const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';

const User = require('../models/auth-model').UserModel;


exports.getProfile = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ _id: id })
        })
            .then(user => {
                mongoose.disconnect();
                resolve(user);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
                console.log(err)
            })
    });
}

exports.updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.updateOne({ _id: id }, data)
        })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
                console.log(err)
            })
    });
}