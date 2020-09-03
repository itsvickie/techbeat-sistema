import { Router } from 'express';
const routes = new Router();
import SessionController from './app/controllers/SessionController';

routes.get('/teste', SessionController.teste);

export default routes;