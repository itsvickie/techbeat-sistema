import { Router } from 'express';
const routes = new Router();

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import ProdutoController from './app/controllers/ProdutoController';

// Login - Usuários Fixos
routes.post('/login', SessionController.login);

// Autenticação do Login, para bloquear usuários não logados
routes.use(authMiddleware);

routes.post('/produto', ProdutoController.create);

routes.put('/produto/:id', ProdutoController.update);

export default routes;