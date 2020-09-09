import { Router } from 'express';
const routes = new Router();
import SessionController from './app/controllers/SessionController';

routes.post('/login', SessionController.login);

export default routes;