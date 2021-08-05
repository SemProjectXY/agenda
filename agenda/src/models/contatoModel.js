const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contatos', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.erros = new Array();
    this.contato = null;
}

Contato.buscaPorId = async function(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
        const user = await ContatoModel.findById(id);
        return user;
    }
    return null;
}
Contato.prototype.register = async function() {
    this.valida();

    if(this.erros.length > 0) return;
    try {
        this.contato = await ContatoModel.create(this.body);
    } catch(e) {
        console.log(e)
    }
}
Contato.prototype.valida = function() {
    this.cleanUp();
    if(this.body.email && !validator.isEmail(this.body.email)) this.erros.push('Email invalido');
    if(!this.body.nome) this.erros.push('Nome e um campo obrigatorio');
    if(!this.body.email && !this.body.telefone) {
        this.erros.push('Obrigadorio pelo menos 1 contato');
    }
};

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof(this.body[key]) !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

Contato.prototype.edit = async function(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) return;
    this.valida();
    if(this.erros.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
    return contatos;
}

Contato.delet = async function(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
}

module.exports = Contato;