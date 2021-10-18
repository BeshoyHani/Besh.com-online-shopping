const productModel = require('../models/products-model');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


exports.getHome = (req, res, next) => {

    //Get Product Data
    //render

    let productPromise;
    let validCategory = ['phones', 'clothes', 'computers-laptops'];
    let category = req.query.category;

    if (category === undefined || category === 'all')
        productPromise = productModel.getAllProducts();
    else //if (category && validCategory.includes(category))
        productPromise = productModel.getProductByCategory(category);
    // else
    //     res.sendStatus(404);

    productPromise.then(products => {
        res.render('index', {
            products: products,
            Category: category? capitalizeFirstLetter(category): "Category",
            userName: req.session.userName,
            userImage: req.session.userImage,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('cartValidationErrors')[0],
            pageTitle: 'Home - Besh.com',
            toastMessage: req.flash('toastMessage')
        });
    })

}
