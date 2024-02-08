module.exports = async (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        return res.redirect('login');
    }
}