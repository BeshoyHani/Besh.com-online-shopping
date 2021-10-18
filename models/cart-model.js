const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';

const cartScheme = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const cartItem = mongoose.model('cart', cartScheme);


exports.doesItemExist = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => cartItem.findOne({ productId: id }))
            .then(item => {
                mongoose.disconnect()
                resolve(item)
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}

exports.addItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let item = new cartItem(data);
            return item.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject();
        })
    })
}

exports.getItemByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => cartItem.find({ userId: userId }/*, {}, { sort: { timestamp: 1 } }*/)
            )
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.updateItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => cartItem.updateOne({ _id: id }, newData)
            )
            .then(items => {
                mongoose.disconnect();
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => cartItem.findByIdAndDelete(id)
            )
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}