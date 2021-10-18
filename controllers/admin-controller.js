const productModel = require('../models/products-model')
const orderModel = require('../models/order-model')

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        isAdmin: true,
        validationErrors: req.flash('validationErrors'),
        userName: req.session.userName,
        userImage: req.session.userImage,
        pageTitle: 'Add Product - Besh.com',
        toastMessage: req.flash('toastMessage'),
    })
}

exports.postAdd = (req, res, next) => {
    productModel.addNewProduct({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.file.filename
    })
        .then(() => {
            req.flash('toastMessage', `${req.body.name} added to products successfully`);
            res.redirect('add')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getOrders = (req, res, next) => {
    let promise;
    if (req.query.status === 'all' || (req.query.status === undefined && req.query.email === undefined)) {
        promise = orderModel.getAllOrders()
    } else if (req.query.status) {
        promise = orderModel.getOrderByStatus(req.query.status);
    } else {
        promise = orderModel.getOrderByEmail(req.query.email);
    }
    promise.then(orders => {
        res.render('manage-orders', {
            orders: orders,
            userName: req.session.userName,
            userImage: req.session.userImage,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Manage Orders - Besh.com',
            toastMessage: req.flash('toastMessage'),
        })
    })
        .catch(err => console.log(err));
}

exports.updateOrderStatus = (req, res, next) => {
    orderModel.updateOrderStatus(req.body.orderId, {
        status: req.body.status
    })
        .then(() => res.redirect('/admin/orders'))
        .catch(err => console.log(err))
}