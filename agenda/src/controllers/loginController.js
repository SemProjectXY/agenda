const Login = require('../models/loginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.redirect('/');
    res.render('login');
}

exports.register = async function(req, res) {
    const login = new Login(req.body);
    try {
        await login.register();

        if(login.erros.length > 0) {
            req.flash('erros', login.erros);
            res.redirect('back');

            return;
        }
        
        req.flash('sucess', 'Criado com sucesso');
        res.redirect('back')
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.login = async function(req, res) {
    const login = new Login(req.body);
    try {
        await login.login();
        if(login.erros.length > 0) {
            req.flash('erros', login.erros);
            res.redirect('back');

            return;
        }
        
        req.flash('sucess', 'Logado com sucesso');
        req.session.user = login.user;
        res.redirect('back')
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}