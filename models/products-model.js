const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';


const productScheme = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
});

const Product = mongoose.model('product', productScheme);

exports.getAllProducts = () => {

    return new Promise((resolve, reject) => {
        
        mongoose.connect(DB_URL).then(() => {
            return Product.find();

        }).then(products => {
            mongoose.disconnect();
            resolve(products);

        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    });
}

exports.getProductByCategory = category => {

    return new Promise((resolve, reject) => {
        
        mongoose.connect(DB_URL).then(() => {
            return Product.find({category: category});

        }).then(products => {
            mongoose.disconnect();
            resolve(products);

        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    });
}

exports.getProductByID = id => {

    return new Promise((resolve, reject) => {
        
        mongoose.connect(DB_URL).then(() => {
            return Product.findById(id);

        }).then(product => {
            mongoose.disconnect();
            resolve(product);

        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    });
}

exports.addNewProduct = data => {

    return new Promise((resolve, reject) => {
        
        mongoose.connect(DB_URL).then(() => {
           let product = new Product(data)
           return product.save();

        }).then( () => {
            mongoose.disconnect();
            resolve();

        }).catch(err => {
            console.log(err);
            mongoose.disconnect();
            reject(err)
        });
    });
}