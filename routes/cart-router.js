const router = require('express').Router();
const cartController = require('../controllers/cart-controller');
const bodyParser = require('body-parser');
const authGuard = require('./guards/auth-guard');
const check = require('express-validator').check;


router.get('/', authGuard.isUser, cartController.getCart);

router.post('/save', authGuard.isUser, bodyParser.urlencoded({ extended: true }),
    check('amount')
        .not().isEmpty()
        .withMessage('Please enter quantity')
        .isInt({ min: 1 })
        .withMessage('quantity must be a positive value'), cartController.updateItem);


        
        router.post('/', authGuard.isUser, bodyParser.urlencoded({ extended: true }),
        check('amount')
        .not().isEmpty()
        .withMessage('Please enter quantity')
        .isInt({ min: 1 })
        .withMessage('quantity must be a positive value'),
        cartController.addItem);
        
router.post('/delete', authGuard.isUser, bodyParser.urlencoded({extended: true}), cartController.deleteItem)


module.exports = router;