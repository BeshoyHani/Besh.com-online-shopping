const router = require('express').Router();
const check = require('express-validator').check;
const multer = require('multer');
const bodyParser = require('body-parser');

const adminController = require('../controllers/admin-controller')
const adminGuard = require('../routes/guards/admin-guard')

router.get('/add', adminGuard, adminController.getAdd)

router.post('/add', adminGuard,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, 'images');
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '-' + file.originalname);
            }
        })
    }).single('image'),
    check('image').custom((value, { req }) => {
        if (req.file)
            return true
        else
            throw 'image is required'
    }),
    adminController.postAdd)


router.get('/orders', adminGuard, adminController.getOrders)

 router.post('/orders/save-status', adminGuard, bodyParser.urlencoded({extended: true}), adminController.updateOrderStatus)

// router.get('/orders/email', adminGuard, bodyParser.urlencoded({extended: true}), adminController.getOrdersByemail)


module.exports = router;