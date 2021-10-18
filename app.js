const DB_URL = 'mongodb://localhost:27017/online-shop';

const express = require('express');
const app = express();
const path = require('path');


const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);

const flash = require('connect-flash');

const homeRouter = require('./routes/home-route')
const productRouter = require('./routes/product-route');
const authRouter = require('./routes/auth-router');
const cartRouter = require('./routes/cart-router');
const orderRouter = require('./routes/order-router');
const adminRouter = require('./routes/admin-router');
const profileRouter = require('./routes/profile-router');

const STORE = new SessionStore({
    uri: DB_URL,
    collection: 'sessions'
});

app.use(session({
    secret: 'tb tb tb tb sh7t m7t 5od fo2 w t7t __ D',
    resave: true,
    saveUninitialized: false,
    cookie:{
        //maxAge: 1*60*60*100
        expires: new Date(253402300000000)
    },
    store: STORE
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static('images'))//(path.join(__dirname, 'images')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(authRouter);
app.get('/', homeRouter);
app.use('/profile', profileRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);
app.use((req, res, next) =>{
    res.render('page-not-found', {
        userName: req.session.userName,
        userImage: req.session.userImage,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Page Not Found',
        toastMessage: req.flash('toastMessage')
    })
});

const port = process.env.PORT || 3000;
app.listen(port, (err)=>{
    console.log(err);
})