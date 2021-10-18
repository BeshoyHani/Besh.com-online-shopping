const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';
const bcrypt = require('bcrypt');

const userScheme = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image:{
        type: String,
        default: "profile.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', userScheme);

exports.UserModel = User;

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        })
            .then(user => {
                if (user) {
                    mongoose.disconnect();
                    reject('Email is Already Used.')
                }
                else
                    return bcrypt.hash(password, 10)
            })
            .then(hashedPassword => {
                let user = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(() => {
                mongoose.disconnect()
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
}



exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        })
        .then(user => {
            if (!user) {
                mongoose.disconnect();
                reject('No user matches with this email.');
            }
            else {
                bcrypt.compare(password, user.password)
                    .then(same => {
                        if (!same) {
                            mongoose.disconnect();
                            reject('Incorrect password.');
                        }
                        else {
                            mongoose.disconnect();
                            resolve({
                                userId: user._id,
                                userName: user.username,
                                userEmail: user.email,
                                isAdmin: user.isAdmin,
                                userImage: user.image
                            });
                        }
                    });
            }
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
}