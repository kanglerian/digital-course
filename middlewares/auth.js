const Auth = {
    checkLogin: (req, res, next) => {
        if(!req.session.logged){
            return res.redirect('/');
        }
        next();
    },
    checkStatus: (req, res, next) => {
        if(!req.session.status == 1){
            return res.redirect('/');
        }
        next();
    }
}

module.exports = Auth;