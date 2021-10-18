const productModel = require('../models/products-model');

exports.getProductById = (req, res, next) => {

    //Get Product Data
    //render

    let id = req.params.id;
    console.log(req.params)
    productModel.getProductByID(id).then(product => {
        res.render('product', {
            product: product,
            userName: req.session.userName,
            userImage: req.session.userImage,
            isAdmin: req.session.isAdmin,
            pageTitle: `${product.name}`+' - Besh.com',
            toastMessage: req.flash('toastMessage')
        });
    }).catch(err => console.log(err));

}

exports.getProduct = (req, res, next) => {
     res.render('page-not-found', {
        userName: req.session.userName,
        userImage: req.session.userImage,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Not Found - Besh.com',
        toastMessage: req.flash('toastMessage')
     });

}