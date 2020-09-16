import { Router } from 'express';
const routes = new Router();

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import ProdutoController from './app/controllers/ProdutoController';
import GastosController from './app/controllers/GastosController';
import ClienteController from './app/controllers/ClienteController';
import EstoqueController from './app/controllers/EstoqueController';
import VendaController from './app/controllers/VendaController';

// Login - Usuários Fixos
routes.post('/login', SessionController.login);

// Autenticação do Login, para bloquear usuários não logados
routes.use(authMiddleware);

routes.post('/produto', ProdutoController.create);

routes.put('/produto/:id', ProdutoController.update);

routes.post('/gastos', GastosController.create);

routes.post('/cliente', ClienteController.create);

routes.put('/estoque/:id', EstoqueController.update);

routes.post('/venda/:clienteID', VendaController.create);

export default routes;