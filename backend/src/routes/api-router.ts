import express, { RequestHandler, Request, Response } from 'express';
import User from './controllers/user';
import { Login, Budgets, Ledgers } from './controllers';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { Factory } from '../core/services';

/**
 * This is the manager for the routers of the main server.
 *
 * Basically, the server is there to render the pages and the api is there to
 * get data from the database.
 *
 * The API is not separated onto an other server because the scale of the
 * project is small. The time required to securize the API would not worth the benefits.
 */
export function apiRouter(): express.Router {
  const router = express.Router();

  router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // Creating the routes

  /*
    router.route('/recipes/:id').get(getSpecificRecipe(recipesCollection, imagesFolderLocation))
                                .post(imageManager.middleware, updateRecipe(recipesCollection))
                                .delete(removeRecipe(recipesCollection));*/

  // Got to return the router for it to be used later on.
  const login = new Login();
  const budgets = new Budgets();
  const ledgers = new Ledgers();

  router.route('/signup').put(User.getInstance().put);
  router.route('/login').post(login.post);
  router.route('/user').get(checkToken, User.getInstance().get);
  router
    .route('/budgets')
    .get(checkToken, budgets.get)
    .put(checkToken, budgets.put);
  router
    .route('/ledgers')
    .get(checkToken, ledgers.get)
    .put(checkToken, ledgers.put)
    .post(checkToken, ledgers.post)
    .delete(checkToken, ledgers.delete);

  return router;
}

export const checkToken = async (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;

  try {
    const decoded = await Factory.getInstance()
      .authentication()
      .validateToken(token);

    req.headers.decoded = JSON.stringify(decoded);

    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};
