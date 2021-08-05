exports.middlewareGlobal = (req, res, next) => {
    res.locals.erros = req.flash('erros');
    res.locals.sucess = req.flash('sucess');
    res.locals.user = req.session.user;
    next();
}

exports.checkError = (req, res, next) => {
    res.status(404).render('404');
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('erros', 'Voce precisa fazer login');
        res.redirect('back')
        return;
    }

    next();
}

exports.register = (req, res, next) => {
    
}