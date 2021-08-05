const Contato = require('../models/contatoModel');

exports.index = (req, res, next) => {
    res.render('contato', { contato: '' });
}

exports.register = async function(req, res, next) {
    const contato = new Contato(req.body);
    try {
        await contato.register();

        if(contato.erros.length > 0) {
            req.flash('erros', contato.erros);
            res.redirect('back');
            return;
        }

        req.flash('sucess', 'Criado com sucesso');
        res.redirect('/contato/index/' + contato.contato._id);
    } catch(e) {
        console.log(e);
    }
}

exports.editIndex = async function(req, res, next) {
    try {
        const contato = await Contato.buscaPorId(req.params.id);
        if(!contato) return res.render('404');
        res.render('contato', { contato });
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.edit = async function(req, res, next) {
    if(!req.params.id) return;
    const contato = new Contato(req.body);
    try {
    await contato.edit(req.params.id);
    if(contato.erros.length > 0) {
        req.flash('erros', contato.erros);
        res.redirect('back');
        return
    }
    req.flash('sucess', 'Contato edita com sucesso');
    res.redirect('/contato/index/' + contato.contato.id);
    return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.delet = async function(req, res, next) {
    try {
        const contato = await Contato.delet(req.params.id);
        if(!contato) return res.render('404');

        req.flash('sucess', 'Contato apagado com sucesso');
        res.redirect('back');
    } catch(e) {
        console.log(e);
        res.redirect('404');
    }
}