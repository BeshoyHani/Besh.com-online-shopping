const cartModel = require('../models/cart-model');
const validationResult = require('express-validator').validationResult;


exports.addItem = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        let promise;
        cartModel.doesItemExist(req.body.productId)
        .then(item => {
            if(item !== null){
                let newAmount = +req.body.amount + +item.amount;
                promise = cartModel.updateItem(item._id, {amount: newAmount})
            } else{
                promise = cartModel.addItem({
                    name: req.body.name,
                    price: req.body.price,
                    amount: req.body.amount,
                    userId: req.session.userId,
                    productId: req.body.productId,
                    timestamp: Date.now()
                })
            }

            promise.then(() => {
                req.flash('toastMessage', `${req.body.name} added to cart`);
                res.redirect(req.body.routeTo);
            }).catch(err => {
                console.log(err);
            })
        })
        
    } else {
        console.log(req.body.productId)
        req.flash('cartValidationErrors', validationResult(req).array());
        res.redirect(req.body.routeTo);
    }
}

exports.getCart = (req, res, next) => {
    cartModel.getItemByUser(req.session.userId)
        .then(items => [
            res.render('cart', {
                items: items,
                userName: req.session.userName,
                isAdmin: req.session.isAdmin,
                userImage: req.session.userImage,
                pageTitle: 'My Cart - Besh.com',
                toastMessage: req.flash('toastMessage'),
            })
        ])
        .catch(err => console.log(err));
}

exports.updateItem = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.updateItem(req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()
        })
            .then(() => res.redirect('/cart'))
            .catch(err => console.log(err))

    } else {
        req.flash('cartValidationErrors', validationResult(req).array());
        res.redirect('/cart');
    }
}

exports.deleteItem = (req, res, next) => {
    cartModel.deleteItem(req.body.cartId)
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err))
}