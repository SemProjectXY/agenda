export default class Login {
    constructor(formClass) {
        this.form = formClass;
        this.erros = new Array();
    }
    
    valida(email, senha) {
        if(!email) this.erros.push('Digite um email');
        if(senha.length < 3 || senha.length > 50) {
            this.erros.push('A senha precisa estar entre 3 a 50 caracteries');
        }
    }

    init() {
        const email = this.form.querySelector('input[name="email"]');
        const senha = this.form.querySelector('input[name="senha"]');

        this.valida(email.value, senha.value);

        if(this.erros.length > 0) return this.erros.forEach((value) => {
            window.alert(value);
        });

        this.form.submit();
    }
}
