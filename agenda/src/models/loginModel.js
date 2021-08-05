const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const ErroLog = require('../../error');

const fs = require('fs');
//escrever 
//fs.writeFile(caminhoArquivo, 'frase1\nPoxa eae\nAlgo esta errado?', { flag: 'w'});
//ler
//fs.readFile(caminhoArquivo, 'utf8');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    senha: { type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = new Array();
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.erros.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(!this.user) {
            this.erros.push('Usuario nao existe');
            return;
        }
        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.erros.push('Senha invalida');
            return;
        }
    }
    async register() {
        this.valida();
        if(this.erros.length > 0) return;

        await this.userExists();

        if(this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
        this.user = await LoginModel.create(this.body);
    }
    async userExists() {
        try {
            this.user = await LoginModel.findOne({ email: this.body.email});
            if(this.user) this.erros.push('Usuario ja existe');
        } catch(e) {
            console.log(e);
            this.erros.push('Erro desconhecido');
        }
    }
    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.erros.push('Email invalido');

        if(this.body.senha.length < 3 || this.body.senha.length > 50) {
            this.erros.push('A senha precisa estar entre 3 a 50 caracteries');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof(this.body[key]) !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
}

module.exports = Login;