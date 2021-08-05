import 'core-js/stable';
import 'regenerator-runtime';

import './assets/css/style.css';

import Login from './modules/Login';
import Contato from './modules/Contato';

window.document.addEventListener('submit', (e) => {
    e.preventDefault();
    const path = window.location.pathname;

    if(path === '/login/index') {
        const login = new Login(e.target);
        login.init();
        return;
    }

    if(path === '/contatos/index') {
        const contato = new Contato(e.target);
        contato.init();
        return;
    }
})