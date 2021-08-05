const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const middleware = require('./src/middlewares/middlewareGlobal');

//home
routes.get('/', homeController.index);

//login
routes.get('/login/index', loginController.index);

routes.post('/login/register', loginController.register);
routes.post('/login/login',loginController.login);
routes.get('/login/logout',loginController.logout);

//contato

routes.get('/contatos/index', middleware.loginRequired, contatoController.index);
routes.post('/contato/criar', middleware.loginRequired, contatoController.register);

routes.get('/contato/index/:id', middleware.loginRequired, contatoController.editIndex);

routes.post('/contato/edit/:id', middleware.loginRequired, contatoController.edit);
routes.get('/contato/delet/:id', middleware.loginRequired, contatoController.delet);

module.exports = routes;