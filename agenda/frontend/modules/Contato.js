export default class Contato {
    constructor(formClass) {
        this.form = formClass;
        this.erros = new Array();
    }
    
    valida(nome, sobrenome, email, telefone) {

        if(!nome) this.erros.push('Nome e um campo obrigatorio');
        if(!email && !telefone) {
            this.erros.push('Obrigadorio pelo menos 1 contato');
        }
    }

    init() {
        const nome = this.form.querySelector('input[name="nome"]');
        const sobrenome = this.form.querySelector('input[name="sobrenome"]');
        const email = this.form.querySelector('input[name="email"]');
        const telefone = this.form.querySelector('input[name="telefone"]');
        
        this.valida(nome.value, sobrenome.value, email.value, telefone.value);

        if(this.erros.length > 0) return this.erros.forEach((value) => {
            window.alert(value);
        });

        this.form.submit();
    }
}
