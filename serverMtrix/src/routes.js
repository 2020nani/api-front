import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import SwaggerUi from 'swagger-ui-express';
import SwwagerDocs from '../swagger.json'
import authMiddleware from './app/middlewares/auth';
import ProdutoController from './app/controllers/ProdutoController';


const routes = new Router();
routes.use('/api-docs', SwaggerUi.serve)
routes.get('/api-docs', SwaggerUi.setup(SwwagerDocs))
routes.post('/api/v1/login', SessionController.store);
routes.post('/api/v1/users', UserController.store);
routes.use(authMiddleware);
/*rotas so serao acessadas com o jwttoken*/
routes.put('/api/v1/users/:user_id', UserController.update);
routes.delete('/api/v1/users/:user_id', UserController.deleteOnlyUser);
routes.delete('/api/v1/users', UserController.deleteAllUsers);
routes.get('/api/v1/users/:user_id', UserController.listOnlyUser);
routes.get('/api/v1/users', UserController.listUsers);
routes.post('/api/v1/produtos', ProdutoController.store);
routes.put('/api/v1/produto/:codigo', ProdutoController.update);
routes.get('/api/v1/produtos', ProdutoController.listaProdutos);
routes.get('/api/v1/produto/:codigo', ProdutoController.listaProdutoPorId);
routes.delete('/api/v1/produto/:codigo', ProdutoController.deleteProduto);


module.exports = routes;