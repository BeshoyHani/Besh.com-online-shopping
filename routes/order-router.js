const router = require('express').Router();
const orderController = require('../controllers/order-controller');
const bodyParser = require('body-parser');
const authGuard = require('./guards/auth-guard');
const check = require('express-validator').check;

router.post('/address', bodyParser.urlencoded({extended: true}), authGuard.isAuth, orderController.insertAddress);

router.post('/', bodyParser.urlencoded({extended: true}), authGuard.isAuth, orderController.submitOrder)

router.get('/', authGuard.isAuth, orderController.getOrders)

router.post('/cancel', authGuard.isUser, bodyParser.urlencoded({extended: true}), orderController.deleteOrder)

module.exports = router;