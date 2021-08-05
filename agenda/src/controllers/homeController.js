const Contato = require('../models/contatoModel');

exports.index = async function(req, res, next) {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
}
