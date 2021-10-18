const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';


const orderScheme = mongoose.Schema({
    name: String,
    cost: Number,
    amount: Number,
    address: String,
    status: String,
    userId: String,
    userEmail: String,
    productId: String,
    time: Number
});

const orderItem = mongoose.model('order', orderScheme);


exports.addOrder = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                let item = new orderItem(data);
                return item.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                console.log(err)
                reject();
            })
    })
}

exports.getAllOrders = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => orderItem.find()
            )
            .then(orders => {
                mongoose.disconnect();
                resolve(orders);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.getOrderByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => orderItem.find({ userId: userId })
            )
            .then(orders => {
                mongoose.disconnect();
                resolve(orders);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.getOrderByEmail = email => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => orderItem.find({ userEmail: email })
            )
            .then(orders => {
                mongoose.disconnect();
                resolve(orders);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.getOrderByStatus = status => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => orderItem.find({ status: status })
            )
            .then(orders => {
                mongoose.disconnect();
                resolve(orders);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}


exports.updateOrderStatus = (id, data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => orderItem.updateOne({_id: id}, data)
            )
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.deleteOrder = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => orderItem.findByIdAndDelete(id)
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