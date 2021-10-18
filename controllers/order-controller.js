const orderModel = require('../models/order-model');
const cartModel = require('../models/cart-model');
const validationResult = require('express-validator').validationResult;

exports.insertAddress = (req, res, next) => {
    console.log('besh  ' + req.body.itemName)
    res.render('address', {
        itemName: req.body.itemName,
        itemCost: req.body.itemCost,
        itemAmount: req.body.itemAmount,
        itemId: req.body.itemId,
        cartId: req.body.cartId,
        userName: req.session.userName,
        userImage: req.session.userImage,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Address - Besh.com',
        toastMessage: req.flash('toastMessage'),
    })
}

exports.submitOrder = (req, res, next) => {

    orderModel.addOrder({
        name: req.body.itemName,
        cost: +req.body.itemCost,
        amount: req.body.itemAmount,
        address: req.body.address,
        status: 'pending',
        userId: req.session.userId,
        userEmail: req.session.userEmail,
        productId: req.body.itemtId,
        cartId: req.body.cartId,
        time: Date.now()
    })
        .then(() => cartModel.deleteItem(req.body.cartId))
        .then(() => res.redirect('/orders'))
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    orderModel.getOrderByUser(req.session.userId)
        .then(orders => {
            res.render('orders', {
                orders: orders,
                userName: req.session.userName,
                userImage: req.session.userImage,
                isAdmin: req.session.isAdmin,
                pageTitle: 'My Orders - Besh.com',
                toastMessage: req.flash('toastMessage'),
            })
        })
        .catch(err => console.log(err))
}

exports.deleteOrder = (req, res, next) => {
    orderModel.deleteOrder(req.body.orderId)
        .then(() => res.redirect('/orders'))
        .catch(err => console.log(err))
}