exports.isAuth = (req, res, next) => {
    if (req.session.userId)
        next();
    else
        res.redirect('/');
}

exports.notAuth = (req, res, next) => {
    if (!req.session.userId)
        next();
    else
        res.redirect('/');
}

exports.isUser = (req, res, next) => {
    if (req.session.userId)
        next();
    else
        res.redirect('/login');
}
