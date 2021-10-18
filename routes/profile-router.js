const router = require('express').Router();
const profileController = require('../controllers/profile-controller');
const authGuard = require('./guards/auth-guard')
const bodyParser = require('body-parser');
const check = require('express-validator').check;
const multer = require('multer');


router.get('/', authGuard.isUser, profileController.getProfile)

router.post('/save/name', authGuard.isUser, multer().none(), profileController.saveName)

router.post('/save/image', authGuard.isUser,
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
     profileController.saveImage)

module.exports = router;